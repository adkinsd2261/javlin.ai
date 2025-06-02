import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Retry helper for PageSpeed API fetch
async function fetchPageSpeedData(url, apiKey, retries = 3, delay = 1500) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}`
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

    // Fetch PageSpeed data with retry
    let pagespeedData;
    try {
      pagespeedData = await fetchPageSpeedData(siteUrl, process.env.GOOGLE_PAGESPEED_API_KEY);
    } catch (psError) {
      return res.status(500).json({ error: psError.message || "Failed to fetch PageSpeed data" });
    }

    // Extract performance score
    const speedScore = Math.round(pagespeedData.lighthouseResult.categories.performance.score * 100);

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

















