import OpenAI from "openai";
// Node 18+ has fetch globally, otherwise use node-fetch
import fetch from "node-fetch";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const siteUrl = req.query.url;
    if (!siteUrl) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Call Google PageSpeed API
    const psResponse = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(siteUrl)}&key=${process.env.GOOGLE_PAGESPEED_API_KEY}`
    );

    if (!psResponse.ok) {
      const errText = await psResponse.text();
      return res.status(500).json({ error: `PageSpeed API error: ${errText}` });
    }

    const pagespeedData = await psResponse.json();
    const speedScore = Math.round(pagespeedData.lighthouseResult.categories.performance.score * 100);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a web performance and SEO expert providing actionable tips." },
        { role: "user", content: `Website speed score: ${speedScore}. Give 3 clear, actionable improvement tips.` },
      ],
    });

    const aiTips = completion.choices[0].message.content;

    return res.status(200).json({
      speedScore,
      aiTips,
      javlinScore: speedScore, // for demo purpose
    });
  } catch (error) {
    console.error("API handler error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}











