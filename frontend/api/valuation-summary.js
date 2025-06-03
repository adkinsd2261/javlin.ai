import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Utility to add timeout to fetch
async function timeoutFetch(url, options = {}, timeout = 15000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Fetch timeout")), timeout)
    ),
  ]);
}

// Retry helper for PageSpeed API fetch with timeout and fallback
async function fetchPageSpeedData(url, apiKey, retries = 2, delay = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempt ${i + 1} fetching PageSpeed for: ${url}`);
      const response = await timeoutFetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&key=${apiKey}`,
        {},
        15000 // 15 seconds timeout per fetch attempt
      );

      if (response.ok) {
        return response.json();
      } else {
        const errorData = await response.json();
        if (errorData.error && errorData.error.code === 500 && i < retries - 1) {
          // Wait before retrying
          await new Promise((res) => setTimeout(res, delay));
        } else {
          throw new Error(`PageSpeed API error: ${JSON.stringify(errorData)}`);
        }
      }
    } catch (err) {
      console.error(`Attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) {
        // Instead of throwing, return fallback object
        return {
          lighthouseResult: {
            categories: {
              performance: {
                score: 0,
              },
            },
          },
          fallback: true,
          message: "PageSpeed API timeout or unreachable, showing fallback data.",
        };
      }
      // Wait before retrying on fetch timeout or error
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  // Should never reach here
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
      return res.status(500).json({ error: psError.message || "Failed to fetch PageSpeed data" });
    }

    // Extract performance score safely
    const speedScore =
      Math.round(
        pagespeedData?.lighthouseResult?.categories?.performance?.score * 100
      ) || 0;

    if (pagespeedData.fallback) {
      console.warn("Using fallback PageSpeed data due to timeout.");
    }

    // Generate AI tips with OpenAI, skip if fallback
    let aiTips = "Could not generate AI tips due to PageSpeed API timeout.";

    if (!pagespeedData.fallback) {
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
        console.error("OpenAI fetch error:", aiError);
        aiTips = "Failed to fetch AI tips";
      }
    }

    // Return data
    return res.status(200).json({
      speedScore,
      aiTips,
      javlinScore: speedScore,
      fallback: pagespeedData.fallback || false,
      message: pagespeedData.message || "",
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}























