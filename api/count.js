export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}/subscriptions?api_secret=${process.env.KIT_API_SECRET}`,
    );

    const data = await response.json();
    const count = data?.total_subscriptions ?? 0;

    return res.status(200).json({ count });

  } catch (err) {
    return res.status(200).json({ count: 0 });
  }
}
