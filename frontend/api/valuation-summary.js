import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Utility for fetch with timeout and retries (optional)
async function fetchPageSpeedData(url, apiKey, retries = 3, delay = 1500) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&key=${apiKey}`
      );

      if (response.ok) return response.json();

      const errorData = await response.json();
      if (errorData.error && errorData.error.code === 500 && i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw new Error(`PageSpeed API error: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const siteUrl = req.query.url;
  if (!siteUrl) return res.status(400).json({ error: "Missing url parameter" });

  let pagespeedData;
  try {
    pagespeedData = await fetchPageSpeedData(siteUrl, process.env.GOOGLE_PAGESPEED_API_KEY);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to fetch PageSpeed data" });
  }

  const speedScore = Math.round(pagespeedData?.lighthouseResult?.categories?.performance?.score * 100) || 0;

  // Example dummy data for other KPIs (replace with real logic or API calls)
  const progressData = {
    value: 86,
    dataPoints: [72, 75, 78, 86],
    labels: ["Apr", "May", "Jun", "Jul"],
  };

  let aiTips = "";
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert web performance and SEO analyst providing actionable tips." },
        { role: "user", content: `The website has a speed performance score of ${speedScore}. Give me 3 clear, actionable improvement tips.` },
      ],
    });
    aiTips = completion.choices[0].message.content;
  } catch {
    aiTips = "Failed to fetch AI tips";
  }

  return res.status(200).json({
    javlinScore: speedScore,
    speedScore,
    speedChart: progressData.dataPoints.map((v, i) => ({ month: progressData.labels[i], value: v })),
    progressData,
    aiTips,
  });
}



























