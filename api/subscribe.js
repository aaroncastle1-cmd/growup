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
      `https://api.kit.com/v4/forms/${process.env.KIT_FORM_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.KIT_API_KEY}`,
        },
        body: JSON.stringify({ email_address: email }),
      }
    );

    const data = await response.json();
    return res.status(response.ok ? 200 : 400).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
