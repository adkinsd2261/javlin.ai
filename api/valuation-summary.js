export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const pagespeedApiKey = process.env.GOOGLE_PAGESPEED_API_KEY;

    const targetUrl = req.query.url || "https://example.com"; // You can pass ?url=

    // --- Google PageSpeed API Call ---
    const pagespeedResponse = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&key=${pagespeedApiKey}`
    );
    const pagespeedData = await pagespeedResponse.json();

    const speedScore = Math.round(pagespeedData.lighthouseResult?.categories.performance?.score * 100) || 0;

    // --- OpenAI API Call ---
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Provide a brief SEO improvement summary for ${targetUrl}.`
          }
        ]
      })
    });

    const openaiData = await openaiResponse.json();
    const seoSummary = openaiData.choices?.[0]?.message?.content || "No SEO insights available.";

    // --- Assemble Final Data ---
    const response = {
      javlinScore: Math.round((speedScore + 80) / 2), // example combo score
      seoScore: 80, // placeholder, replace with real SEO score if you have one
      speedScore: speedScore,
      traffic: 12500, // placeholder or pull from another source
      revenue: 32000, // placeholder
      conversionRate: 2.5, // placeholder
      monthlyVisitors: 56, // placeholder (in K)
      bounceRate: 34, // placeholder
      avgSessionDuration: "3:24", // placeholder
      newUsers: 4100, // placeholder
      returningUsers: 3700, // placeholder
      seoSummary: seoSummary,
      trafficChart: [
        { month: "Feb", value: 4000 },
        { month: "Mar", value: 6000 },
        { month: "Apr", value: 8000 },
        { month: "May", value: 9000 }
      ],
      revenueChart: [
        { month: "Feb", value: 15000 },
        { month: "Mar", value: 20000 },
        { month: "Apr", value: 28000 },
        { month: "May", value: 32500 }
      ]
      // add additional charts as needed
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in valuation-summary:", error);
    return res.status(500).json({ error: "Server error fetching summary" });
  }
}

