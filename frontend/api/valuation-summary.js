import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Utility to add timeout to fetch
async function timeoutFetch(url, options = {}, timeout = 10000) { // 10 seconds timeout
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Fetch timeout")), timeout)
    ),
  ]);
}

// Retry helper for PageSpeed API fetch with timeout and logging
async function fetchPageSpeedData(url, apiKey, retries = 2, delay = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempt ${i + 1} fetching PageSpeed for: ${url}`);
      const response = await timeoutFetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&key=${apiKey}`,
        {},
        10000 // 10 seconds timeout per attempt
      );
      console.log(`Response status: ${response.status}`);

      if (response.ok) {
        const json = await response.json();
        console.log("PageSpeed data received successfully.");
        return json;
      } else {
        const errorData = await response.json();
        console.warn(`PageSpeed API error on attempt ${i + 1}:`, errorData);
        if (errorData.error && errorData.error.code === 500 && i < retries - 1) {
          console.log(`Retrying after delay ${delay}ms...`);
          await new Promise((res) => setTimeout(res, delay));
        } else {
          throw new Error(`PageSpeed API error: ${JSON.stringify(errorData)}`);
        }
      }
    } catch (err) {
      console.error(`Attempt ${i + 1} failed: ${err.message}`);
      if (i === retries - 1) {
        throw err; // rethrow after last attempt
      }
      console.log(`Retrying after delay ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Failed to fetch PageSpeed data after retries");
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const siteUrl = req.query.url;
    if (!siteUrl) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Fetch PageSpeed data with retry and timeout
    let pagespeedData;
    try {
      pagespeedData = await fetchPageSpeedData(siteUrl, process.env.GOOGLE_PAGESPEED_API_KEY);
    } catch (psError) {
      console.error("PageSpeed API fetch failed:", psError);
      return res.status(500).json({ error: psError.message || "Failed to fetch PageSpeed data" });
    }

    // Extract performance score safely
    const speedScore =
      Math.round(
        pagespeedData?.lighthouseResult?.categories?.performance?.score * 100
      ) || 0;

    // Generate AI tips with OpenAI
    let aiTips = "";
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert web performance and SEO analyst providing actionable tips.",
          },
          {
            role: "user",
            content: `The website has a speed performance score of ${speedScore}. Give me 3 clear, actionable improvement tips.`,
          },
        ],
      });

      aiTips = completion.choices[0].message.content;
    } catch (aiError) {
      console.error("OpenAI fetch failed:", aiError);
      return res.status(500).json({ error: "Failed to fetch AI tips" });
    }

    // Return data
    return res.status(200).json({
      speedScore,
      aiTips,
      javlinScore: speedScore,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



















