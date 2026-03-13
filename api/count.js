export default async function handler(req, res) {
  // Cache for 5 minutes so we're not hammering the Kit API on every page load
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}?api_key=${process.env.KIT_API_KEY}`
    );

    const data = await response.json();

    // Kit returns total_subscriptions on the form object
    const count = data?.form?.total_subscriptions ?? 0;

    return res.status(200).json({ count });

  } catch (err) {
    // Fail gracefully — page still works, counter just stays at fallback
    return res.status(200).json({ count: 0 });
  }
}
