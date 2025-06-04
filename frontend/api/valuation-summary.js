import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Timeout fetch helper
async function timeoutFetch(url, options = {}, timeout = 15000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Fetch timeout")), timeout)
    ),
  ]);
}

// Fetch PageSpeed data with limited retries
async function fetchPageSpeedData(url, apiKey, retries = 2, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await timeoutFetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&key=${apiKey}`,
        {},
        15000 // 15 seconds timeout per attempt
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
        throw err;
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Failed to fetch PageSpeed data after retries");
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const siteUrl = req.query.url;
  if (!siteUrl) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  // Check cache
  const cached = cache.get(siteUrl);
  const now = Date.now();
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return res.status(200).json(cached.data);
  }

  let pagespeedData;
  try {
    pagespeedData = await fetchPageSpeedData(siteUrl, process.env.GOOGLE_PAGESPEED_API_KEY);
  } catch (psError) {
    console.error("PageSpeed API error:", psError.message);
    // Return partial data with error message
    return res.status(500).json({
      speedScore: null,
      aiTips: "PageSpeed data unavailable, please try again later.",
      javlinScore: null,
      error: psError.message,
    });
  }

  // Extract performance score safely
  const speedScore =
    Math.round(
      pagespeedData?.lighthouseResult?.categories?.performance?.score * 100
    ) || 0;

  // Setup OpenAI timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds timeout

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
          content: `The website has a speed performance score of ${speedScore}. Give me 3 clear, concise improvement tips.`,
        },
      ],
      max_tokens: 150,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    aiTips = completion.choices[0].message.content;
  } catch (aiError) {
    clearTimeout(timeoutId);
    console.error("OpenAI fetch error or timeout:", aiError.message || aiError);
    aiTips = "AI tips unavailable at the moment, please try again later.";
  }

  const data = {
    speedScore,
    aiTips,
    javlinScore: speedScore,
  };

  // Cache result
  cache.set(siteUrl, { data, timestamp: now });

  return res.status(200).json(data);
}






























