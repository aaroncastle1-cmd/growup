export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  try {
    const response = await fetch(
      `https://api.kit.com/v4/forms/${process.env.KIT_FORM_ID}`,
      {
        headers: {
          'X-Kit-Api-Key': process.env.KIT_API_KEY,
        },
      }
    );

    const data = await response.json();
    const count = data?.form?.total_subscribers ?? 0;

    return res.status(200).json({ count });

  } catch (err) {
    return res.status(200).json({ count: 0 });
  }
}
