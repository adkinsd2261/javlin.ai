import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    const siteUrl = req.query.url;
    if (!siteUrl) return res.status(400).json({ error: "Missing url parameter" });

    let pagespeedData;
    try {
      pagespeedData = await fetchPageSpeedData(siteUrl, process.env.GOOGLE_PAGESPEED_API_KEY);
    } catch (psError) {
      return res.status(500).json({ error: psError.message || "Failed to fetch PageSpeed data" });
    }

    const speedScore = Math.round(pagespeedData?.lighthouseResult?.categories?.performance?.score * 100) || 0;

    // AI tips generation
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
    } catch {
      return res.status(500).json({ error: "Failed to fetch AI tips" });
    }

    // Mock traffic and earnings
    const traffic = 31500;
    const earnings = 8420;

    // Generate mock chart data
    const generateMockChart = () => [
      { month: "Jan", value: 30 },
      { month: "Feb", value: 45 },
      { month: "Mar", value: 60 },
      { month: "Apr", value: 55 },
      { month: "May", value: 75 },
    ];

    return res.status(200).json({
      javlinScore: speedScore,
      speedScore,
      speedChart: generateMockChart(),
      traffic,
      trafficChart: generateMockChart(),
      earnings,
      earningsChart: generateMockChart(),
      competitors: [
        { name: "Bestboy.com", score: 86 },
        { name: "example.com", score: 79 },
      ],
      aiTips,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

























