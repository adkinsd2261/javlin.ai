import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple in-memory cache (keyed by URL)
const cache = new Map();

// Timeout helper for fetch
async function timeoutFetch(url, options = {}, timeout = 25000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Fetch timeout")), timeout)
    ),
  ]);
}

// Retry helper with timeout for Google PageSpeed API
async function fetchPageSpeedData(url, apiKey, retries = 3, delay = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await timeoutFetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&key=${apiKey}`
      );

      if (response.ok) {
        return response.json();
      } else {
        const errorData = await response.json();
        if (
          errorData.error &&
          errorData.error.code === 500 &&
          i < retries - 1
        ) {
          await new Promise((res) => setTimeout(res, delay));
        } else {
          throw new Error(`PageSpeed API error: ${JSON.stringify(errorData)}`);
        }
      }
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET")
      return res.status(405).json({ error: "Method not allowed" });

    const siteUrl = req.query.url;
    if (!siteUrl)
      return res.status(400).json({ error: "Missing url parameter" });

    // Check cache first to avoid repeated API calls within 10 mins
    if (cache.has(siteUrl)) {
      const cached = cache.get(siteUrl);
      // Cache valid for 10 minutes
      if (Date.now() - cached.timestamp < 10 * 60 * 1000) {
        return res.status(200).json(cached.data);
      }
    }

    // Fetch PageSpeed data
    let pagespeedData;
    try {
      pagespeedData = await fetchPageSpeedData(
        siteUrl,
        process.env.GOOGLE_PAGESPEED_API_KEY
      );
    } catch (psError) {
      return res
        .status(500)
        .json({ error: psError.message || "Failed to fetch PageSpeed data" });
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
            content:
              "You are an expert web performance and SEO analyst providing actionable tips.",
          },
          {
            role: "user",
            content: `The website has a speed performance score of ${speedScore}. Give me 3 clear, actionable improvement tips.`,
          },
        ],
      });
      aiTips = completion.choices[0].message.content;
    } catch {
      return res.status(500).json({ error: "Failed to fetch AI tips" });
    }

    // Mock other data — replace with real data when available
    const generateMockChart = () => [
      { month: "Jan", value: 30 },
      { month: "Feb", value: 45 },
      { month: "Mar", value: 60 },
      { month: "Apr", value: 55 },
      { month: "May", value: 75 },
    ];

    const responsePayload = {
      javlinScore: speedScore,
      speedScore,
      speedChart: generateMockChart(),
      traffic: 31500,
      trafficChart: generateMockChart(),
      earnings: 8420,
      earningsChart: generateMockChart(),
      competitors: [
        { name: "Bestboy.com", score: 86 },
        { name: "example.com", score: 79 },
      ],
      aiTips,
    };

    // Cache the response
    cache.set(siteUrl, { data: responsePayload, timestamp: Date.now() });

    return res.status(200).json(responsePayload);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


























