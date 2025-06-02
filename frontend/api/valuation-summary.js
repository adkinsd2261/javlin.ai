import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    // Dynamically import fetch if not available globally (Node 18+ has global fetch)
    const fetch = global.fetch || (await import('node-fetch')).then(mod => mod.default);

    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const siteUrl = req.query.url;
    if (!siteUrl) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Google PageSpeed API call with timing
    let pagespeedData;
    try {
      console.time("PageSpeed API");
      const psResponse = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(siteUrl)}&key=${process.env.GOOGLE_PAGESPEED_API_KEY}`
      );
      console.timeEnd("PageSpeed API");

      if (!psResponse.ok) {
        const errText = await psResponse.text();
        return res.status(500).json({ error: `PageSpeed API error: ${errText}` });
      }

      pagespeedData = await psResponse.json();
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch PageSpeed data" });
    }

    // Extract performance score
    const speedScore = Math.round(
      pagespeedData.lighthouseResult.categories.performance.score * 100
    );

    // OpenAI completion with timing
    let aiTips = "";
    try {
      console.time("OpenAI API");
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
      console.timeEnd("OpenAI API");
      aiTips = completion.choices[0].message.content;
    } catch (aiError) {
      return res.status(500).json({ error: "Failed to fetch AI tips" });
    }

    // Respond with metrics and AI tips
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














