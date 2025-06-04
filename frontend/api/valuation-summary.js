import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Utility to add timeout to fetch
async function timeoutFetch(url, options = {}, timeout = 30000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Fetch timeout")), timeout)
    ),
  ]);
}

// Retry helper for PageSpeed API fetch with timeout
async function fetchPageSpeedData(url, apiKey, retries = 3, delay = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await timeoutFetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&key=${apiKey}`,
        {},
        25000 // 25 seconds timeout per fetch attempt
      );

      if (response.ok) {
        return response.json();
      } else {
        const errorData = await response.json();
        if (errorData.error && errorData.error.code === 500 && i < retries - 1) {
          await new Promise((res) => setTimeout(res, delay));
        } else {
          throw new Error(`PageSpeed API error: ${JSON.stringify(errorData)}`);
        }
      }
    } catch (err) {
      if (i === retries - 1) {
        throw err; // rethrow after last attempt
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Failed to fetch PageSpeed data after retries");
}

// OpenAI call wrapped in timeout using Promise.race (no signal option)
async function openaiWithTimeout(messages, timeoutMs = 20000) {
  const openaiPromise = openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    max_tokens: 150,
  });

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("OpenAI request timed out")), timeoutMs)
  );

  return Promise.race([openaiPromise, timeoutPromise]);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const siteUrl = req.query.url;
  if (!siteUrl) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

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

  let aiTips = "";
  try {
    const completion = await openaiWithTimeout([
      {
        role: "system",
        content: "You are an expert web performance and SEO analyst providing actionable tips.",
      },
      {
        role: "user",
        content: `The website has a speed performance score of ${speedScore}. Give me 3 clear, concise improvement tips.`,
      },
    ]);

    aiTips = completion.choices[0].message.content;
  } catch (aiError) {
    console.error("OpenAI fetch error or timeout:", aiError.message || aiError);
    aiTips = "AI tips unavailable at the moment, please try again later.";
  }

  // Return combined response
  return res.status(200).json({
    speedScore,
    aiTips,
    javlinScore: speedScore,
  });
}































