import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache: { [url]: { timestamp: number, data: object } }
const cache = {};
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

// Timeout helper for fetch
async function timeoutFetch(url, options = {}, timeout = 15000) { // 15s timeout
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Fetch timeout")), timeout)
    ),
  ]);
}

// Fetch with 1 retry max to speed failover
async function fetchPageSpeedData(url, apiKey) {
  try {
    const response = await timeoutFetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${apiKey}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`PageSpeed API error: ${JSON.stringify(errorData)}`);
    }
    return response.json();
  } catch (err) {
    // 1 retry
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const retryResponse = await timeoutFetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&key=${apiKey}`
      );
      if (!retryResponse.ok) {
        const errorData = await retryResponse.json();
        throw new Error(`PageSpeed API retry error: ${JSON.stringify(errorData)}`);
      }
      return retryResponse.json();
    } catch (retryErr) {
      throw retryErr;
    }
  }
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

    // Check cache
    const cached = cache[siteUrl];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.status(200).json(cached.data);
    }

    // Fetch fresh data
    let pagespeedData;
    try {
      pagespeedData = await fetchPageSpeedData(siteUrl, process.env.GOOGLE_PAGESPEED_API_KEY);
    } catch (psError) {
      // If cache exists, serve stale with warning
      if (cached) {
        return res.status(200).json({
          ...cached.data,
          warning: "Serving cached data due to PageSpeed API failure",
        });
      }
      return res.status(500).json({ error: psError.message || "Failed to fetch PageSpeed data" });
    }

    const speedScore =
      Math.round(
        pagespeedData?.lighthouseResult?.categories?.performance?.score * 100
      ) || 0;

    // Generate AI tips
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
      aiTips = "Unable to generate AI tips at the moment.";
    }

    const responseData = {
      speedScore,
      aiTips,
      javlinScore: speedScore,
    };

    // Cache response
    cache[siteUrl] = {
      timestamp: Date.now(),
      data: responseData,
    };

    return res.status(200).json(responseData);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}





















