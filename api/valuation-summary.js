import OpenAI from "openai";
import fetch from "node-fetch";  // make sure you have this installed

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      console.log("Invalid method:", req.method);
      return res.status(405).json({ error: "Method not allowed" });
    }

    const siteUrl = req.query.url;
    console.log("Received URL:", siteUrl);

    if (!siteUrl) {
      console.log("Missing url parameter");
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Google PageSpeed API call
    let pagespeedData;
    try {
      const psResponse = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          siteUrl
        )}&key=${process.env.GOOGLE_PAGESPEED_API_KEY}`
      );
      if (!psResponse.ok) {
        const errText = await psResponse.text();
        console.error("PageSpeed API returned error:", psResponse.status, errText);
        return res.status(500).json({ error: "PageSpeed API error" });
      }
      pagespeedData = await psResponse.json();
      console.log("PageSpeed data received");
    } catch (psError) {
      console.error("PageSpeed API call failed:", psError);
      return res.status(500).json({ error: "Failed to fetch PageSpeed data" });
    }

    // Extract performance score
    const speedScore = Math.round(
      pagespeedData.lighthouseResult.categories.performance.score * 100
    );
    console.log("Speed score:", speedScore);

    // OpenAI completion
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
      console.log("AI tips received");
    } catch (aiError) {
      console.error("OpenAI API call failed:", aiError);
      return res.status(500).json({ error: "Failed to fetch AI tips" });
    }

    const responsePayload = {
      speedScore,
      aiTips,
      // add more if needed
    };

    res.status(200).json(responsePayload);
  } catch (err) {
    console.error("Unexpected error in handler:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}




