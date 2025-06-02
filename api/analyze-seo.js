export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&key=${apiKey}`
  );

  const data = await response.json();

  if (response.ok) {
    res.status(200).json({ lighthouseResult: data.lighthouseResult });
  } else {
    res.status(500).json({ error: data });
  }
}
