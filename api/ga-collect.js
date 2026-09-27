// Server-side forwarder for GA4 Measurement Protocol.
//
// Browsers increasingly block the client-side google-analytics.com/collect
// beacon (Safari ITP, ad blockers, Brave, etc.) while allowing the gtag.js
// loader script itself to load - so gtag "succeeds" but never actually
// reports data. Routing events through our own first-party domain and
// forwarding them server-to-server avoids that blocking entirely.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const measurementId = process.env.GA4_MEASUREMENT_ID || "G-62PXNJZY9K";
  const apiSecret = process.env.GA4_API_SECRET;

  if (!apiSecret) {
    res.status(500).json({ error: "GA4_API_SECRET not configured" });
    return;
  }

  const { client_id, events } = req.body || {};

  if (!client_id || !Array.isArray(events) || events.length === 0) {
    res.status(400).json({ error: "client_id and events are required" });
    return;
  }

  try {
    const gaRes = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id, events }),
      }
    );

    if (!gaRes.ok) {
      res.status(502).json({ error: "GA4 rejected the event" });
      return;
    }

    res.status(204).end();
  } catch (error) {
    res.status(502).json({ error: "Failed to reach GA4" });
  }
}
