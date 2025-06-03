import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache: { [url]: { timestamp: Date, data: object } }
const cache = {};
const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours cache

// Utility to add timeout to fetch
async function timeoutFetch(url, options = {}, timeout = 10000) { // 10s timeout
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Fetch timeout")), timeout)
    ),
  ]);
}

// Retry helper for PageSpeed API fetch with timeout
async function fetchPageSpeedData(url, apiKey, retries = 2, delay = 1000) {
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

      if (response.ok) {
        console.log("PageSpeed fetch successful");
        return response.json();
      } else {
        const errorData = await response.json();
        console.error("PageSpeed API returned error:", errorData);
        if (errorData.error && errorData.error.code === 500 && i < retries - 1) {
          await new Promise((res) => setTimeout(res, delay));
        } else {
          throw new Error(`PageSpeed API error: ${JSON.stringify(errorData)}`);
        }
      }
    } catch (err) {
      console.error(`Attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) {
        throw err; // rethrow after last attempt
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Failed to fetch PageSpeed data after retries");
}

export default async function handler(req, res) {
  console.log("API called with query:", req.query);

  try {
    if (req.method !== "GET") {
      console.log("Method not allowed");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const siteUrl = req.query.url;
    if (!siteUrl) {
      console.log("Missing url parameter");
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Check cache first
    const cached = cache[siteUrl];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      console.log("Returning cached data for", siteUrl);
      return res.status(200).json(cached.data);
    }

    // Fetch PageSpeed data with retry and timeout
    let pagespeedData;
    try {
      pagespeedData = await fetchPageSpeedData(siteUrl, process.env.GOOGLE_PAGESPEED_API_KEY);
    } catch (psError) {
      console.error("PageSpeed fetch error:", psError);
      // Return fallback data with message to user
      return res.status(500).json({ error: "PageSpeed API timeout or error, please try again later." });
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
      console.error("OpenAI fetch error:", aiError);
      // Return partial data but inform AI tips failed
      return res.status(500).json({ error: "Failed to fetch AI tips" });
    }

    // Build response data
    const responseData = {
      speedScore,
      aiTips,
      javlinScore: speedScore,
    };

    // Cache the result
    cache[siteUrl] = {
      timestamp: Date.now(),
      data: responseData,
    };

    console.log("Sending success response");
    return res.status(200).json(responseData);

  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}






















