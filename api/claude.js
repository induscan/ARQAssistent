javascriptexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': process.env.ANTHROPIC_API_KEY
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error processing request' });
  }
}
2. Configuración de Variables de Entorno

Ve a Anthropic Console y obtén tu API key
En Vercel Dashboard → Settings → Environment Variables
Agrega: ANTHROPIC_API_KEY con tu clave de API

3. Actualizar el Frontend
Modifica la llamada a la API en el HTML para usar tu endpoint:
javascript// Cambiar esta línea en el código:
const response = await fetch('https://api.anthropic.com/v1/messages', {

// Por esta:
const response = await fetch('/api/claude', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt })
});
