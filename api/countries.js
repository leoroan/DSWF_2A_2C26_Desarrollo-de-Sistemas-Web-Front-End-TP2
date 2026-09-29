// La credencial solo se lee en el servidor; nunca se envía a React.
export async function countriesHandler(req, res, apiKey = process.env.REST_COUNTRIES_API_KEY) {
  const send = (status, data) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
  }
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return send(405, { error: 'Método no permitido.' })
  }
  const query = new URL(req.url, 'http://localhost').searchParams.get('q')?.trim()
  const allowed = ['argentina', 'brazil', 'chile', 'uruguay', 'spain', 'canada']
  if (!query || !allowed.includes(query.toLowerCase())) {
    return send(400, { error: 'Seleccioná un país disponible.' })
  }
  if (!apiKey) return send(503, { error: 'Servicio de países no configurado.' })
  try {
    const upstream = await fetch(`https://api.restcountries.com/countries/v5?q=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(10000),
    })
    if (!upstream.ok) return send(502, { error: 'El proveedor de países no está disponible.' })
    const payload = await upstream.json()
    if (!Array.isArray(payload?.data?.objects)) {
      return send(502, { error: 'Respuesta de países inválida.' })
    }
    // Solo reenviar los campos de datos que necesita la interfaz.
    const objects = payload.data.objects.map(({ names, codes, capitals, capital, region, population, flag, timezones, languages, currencies, subregion, area }) =>
      ({ names, codes, capitals, capital, region, population, flag, timezones, languages, currencies, subregion, area }))
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600')
    return send(200, { data: { objects } })
  } catch {
    return send(502, { error: 'No se pudo consultar el servicio de países.' })
  }
}

export default function handler(req, res) {
  return countriesHandler(req, res)
}
