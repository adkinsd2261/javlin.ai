import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache: { [url]: { data: ..., timestamp: ... } }
const cache = {};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Timeout wrapper for fetch
async function timeoutFetch(url, options = {}, timeout = 25000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Fetch timeout")), timeout)),
  ]);
}

// Fetch PageSpeed data with retry and timeout
async function fetchPageSpeedData(url, apiKey, retries = 3, delayMs = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await timeoutFetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`,
        {},
        25000
      );

      if (response.ok) {
        return response.json();
      } else {
        const errorData = await response.json();
        if (errorData.error && errorData.error.code === 500 && i < retries - 1) {
          await delay(delayMs);
        } else {
          throw new Error(`PageSpeed API error: ${JSON.stringify(errorData)}`);
        }
      }
    } catch (err) {
      if (i === retries - 1) throw err;
      await delay(delayMs);
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

    // Check cache first (valid for 10 minutes)
    const cacheEntry = cache[siteUrl];
    const now = Date.now();
    if (cacheEntry && now - cacheEntry.timestamp < 10 * 60 * 1000) {
      return res.status(200).json(cacheEntry.data);
    }

    // Fetch fresh PageSpeed data
    let pagespeedData;
    try {
      pagespeedData = await fetchPageSpeedData(siteUrl, process.env.GOOGLE_PAGESPEED_API_KEY);
    } catch (psError) {
      return res.status(500).json({ error: psError.message || "Failed to fetch PageSpeed data" });
    }

    // Extract performance score safely
    const speedScore = Math.round(pagespeedData?.lighthouseResult?.categories?.performance?.score * 100) || 0;

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
      return res.status(500).json({ error: "Failed to fetch AI tips" });
    }

    // Prepare response payload
    const responsePayload = {
      speedScore,
      aiTips,
      javlinScore: speedScore,
    };

    // Cache the result
    cache[siteUrl] = { data: responsePayload, timestamp: now };

    // Send response
    return res.status(200).json(responsePayload);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
























