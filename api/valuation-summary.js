export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // TODO: Replace this mock with real API calls (PageSpeed, etc.)
    const mockData = {
      javlinScore: 85,
      seoScore: 78,
      speedScore: 72,
      traffic: 12500,
      revenue: 32000,
      conversionRate: 2.5,
      monthlyVisitors: 56,
      bounceRate: 34,
      avgSessionDuration: "3:24",
      newUsers: 4100,
      returningUsers: 3700,
      trafficChart: [
        { month: "Feb", value: 4000 },
        { month: "Mar", value: 6000 },
        { month: "Apr", value: 8000 },
        { month: "May", value: 9000 },
      ],
      revenueChart: [
        { month: "Feb", value: 15000 },
        { month: "Mar", value: 20000 },
        { month: "Apr", value: 28000 },
        { month: "May", value: 32500 },
      ],
      conversionChart: [
        { month: "Feb", value: 2.3 },
        { month: "Mar", value: 2.4 },
        { month: "Apr", value: 2.6 },
        { month: "May", value: 2.5 },
      ],
      visitorsChart: [
        { month: "Feb", value: 52000 },
        { month: "Mar", value: 55000 },
        { month: "Apr", value: 58000 },
        { month: "May", value: 56200 },
      ],
      bounceChart: [
        { month: "Feb", value: 34 },
        { month: "Mar", value: 33 },
        { month: "Apr", value: 31 },
        { month: "May", value: 32 },
      ],
      sessionChart: [
        { month: "Feb", value: 210 },
        { month: "Mar", value: 205 },
        { month: "Apr", value: 215 },
        { month: "May", value: 204 },
      ],
      newUsersChart: [
        { month: "Feb", value: 3500 },
        { month: "Mar", value: 3900 },
        { month: "Apr", value: 4200 },
        { month: "May", value: 4100 },
      ],
      returningUsersChart: [
        { month: "Feb", value: 3300 },
        { month: "Mar", value: 3500 },
        { month: "Apr", value: 3700 },
        { month: "May", value: 3700 },
      ],
    };

    return res.status(200).json(mockData);
  } catch (error) {
    console.error("Error in valuation-summary:", error);
    return res.status(500).json({ error: "Server error fetching summary" });
  }
}
