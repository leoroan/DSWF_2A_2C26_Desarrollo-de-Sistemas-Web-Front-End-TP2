// Proxy mínimo para no exponer la clave de Unsplash en el navegador.
// El front consulta /api/city-photo?ciudad=... y este handler agrega el
// Authorization con la clave que solo vive en el servidor.
export async function cityPhotoHandler(req, res, accessKey = process.env.UNSPLASH_ACCESS_KEY) {
  const send = (status, data) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return send(405, { error: 'Método no permitido.' })
  }

  const ciudad = new URL(req.url, 'http://localhost').searchParams.get('ciudad')?.trim()

  if (!ciudad || ciudad.length > 80) {
    return send(400, { error: 'Indicá una ciudad válida.' })
  }

  if (!accessKey) {
    return send(503, { error: 'Servicio de fotos no configurado.' })
  }

  try {
    // Unsplash no encuentra pueblos chicos con el nombre exacto: se prueban
    // variantes de más específica a más general hasta que una devuelva foto.
    const queries = buildQueries(ciudad)
    for (const query of queries) {
      const params = new URLSearchParams({
        query,
        orientation: 'landscape',
      })
      const upstream = await fetch(`https://api.unsplash.com/photos/random?${params}`, {
        headers: { Authorization: `Client-ID ${accessKey}` },
        signal: AbortSignal.timeout(10000),
      })

      if (!upstream.ok) continue

      const foto = await upstream.json()

      if (!foto?.urls?.regular || !foto?.user?.name) continue

      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600')
      return send(200, {
        data: {
          url: foto.urls.regular,
          autor: foto.user.name,
          linkAutor: foto.user.links?.html
            ? `${foto.user.links.html}?utm_source=proyecto_grupal&utm_medium=referral`
            : null,
        },
      })
    }

    return send(502, { error: 'El proveedor de fotos no está disponible.' })
  } catch {
    return send(502, { error: 'No se pudo consultar el servicio de fotos.' })
  }
}

/**
 * Genera variantes de búsqueda: ciudad completa, partes desde la más
 * específica a la más general ("Resistencia, Chaco, Argentina" ->
 * ["Resistencia, Chaco, Argentina", "Resistencia", "Chaco", "Argentina"]).
 */
function buildQueries(ciudad) {
  const parts = ciudad
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  const queries = [ciudad]
  for (const part of parts) {
    if (!queries.includes(part)) queries.push(part)
  }
  if (!queries.includes('Argentina')) queries.push('Argentina')
  return queries.slice(0, 5)
}

export default function handler(req, res) {
  return cityPhotoHandler(req, res)
}
