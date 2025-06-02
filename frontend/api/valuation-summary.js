import OpenAI from "openai";

// Dynamic import fetch for ESM compatibility
const fetch = global.fetch || (await import('node-fetch')).then(mod => mod.default);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache (URL -> response)
const cache = new Map();

export default async function handler(req, res) {
  const startTime = Date.now();

  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const siteUrl = req.query.url;
    if (!siteUrl) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Return cached response if available
    if (cache.has(siteUrl)) {
      console.log(`[Cache] Returning cached result for ${siteUrl}`);
      return res.status(200).json(cache.get(siteUrl));
    }

    console.log(`[API] Fetching PageSpeed data for ${siteUrl}`);
    const psStart = Date.now();

    const psResponse = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(siteUrl)}&key=${process.env.GOOGLE_PAGESPEED_API_KEY}`
    );

    if (!psResponse.ok) {
      const errText = await psResponse.text();
      console.error(`[API] PageSpeed API error: ${errText}`);
      return res.status(500).json({ error: `PageSpeed API error: ${errText}` });
    }

    const pagespeedData = await psResponse.json();
    const psDuration = Date.now() - psStart;
    console.log(`[API] PageSpeed fetched in ${psDuration}ms`);

    const speedScore = Math.round(
      pagespeedData.lighthouseResult.categories.performance.score * 100
    );

    console.log(`[API] Calling OpenAI for tips (speedScore: ${speedScore})`);
    const aiStart = Date.now();

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

    const aiTips = completion.choices[0].message.content;
    const aiDuration = Date.now() - aiStart;
    console.log(`[API] OpenAI tips fetched in ${aiDuration}ms`);

    const responsePayload = {
      speedScore,
      aiTips,
      javlinScore: speedScore,
    };

    // Cache the response for 5 minutes
    cache.set(siteUrl, responsePayload);
    setTimeout(() => cache.delete(siteUrl), 5 * 60 * 1000);

    const totalDuration = Date.now() - startTime;
    console.log(`[API] Total API duration: ${totalDuration}ms`);

    return res.status(200).json(responsePayload);
  } catch (err) {
    console.error("[API] Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}















