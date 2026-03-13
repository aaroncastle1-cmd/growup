export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.KIT_API_KEY,
          email: email,
        }),
      }
    );

    const data = await response.json();
    return res.status(response.ok ? 200 : 400).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
