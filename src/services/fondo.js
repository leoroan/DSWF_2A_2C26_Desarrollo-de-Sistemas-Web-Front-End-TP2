/**
 * Servicio de foto de ciudad (Unsplash vía proxy propio).
 *
 * El navegador consulta `/api/city-photo?ciudad=...` sin credenciales.
 * La clave de Unsplash solo vive en el servidor (`api/city-photo.js`).
 * Si el servicio no está configurado o falla, se devuelve una imagen
 * local de respaldo para no romper el perfil.
 */

const PHOTO_URL = '/api/city-photo'

/**
 * Consulta la foto de una ciudad.
 * @param {string} ciudad
 * @returns {Promise<{url: string, autor: string, linkAutor: string|null, esOffline: boolean}>}
 */
export async function obtenerFotoCiudad(ciudad = 'Buenos Aires') {
  try {
    const response = await fetch(`${PHOTO_URL}?ciudad=${encodeURIComponent(ciudad)}`)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload = await response.json()

    if (!payload?.data?.url) {
      throw new Error('La API no devolvió la foto solicitada.')
    }

    return {
      url: payload.data.url,
      autor: payload.data.autor ?? '',
      linkAutor: payload.data.linkAutor ?? null,
      esOffline: false,
    }
  } catch (error) {
    console.warn('La API de fotos falló. Usando imagen de respaldo local...', error)
    return obtenerImagenRespaldo(ciudad)
  }
}

function obtenerImagenRespaldo(ciudad) {
  return {
    url: '/foto-respaldo.svg',
    autor: `${ciudad} (Vista offline)`,
    linkAutor: null,
    esOffline: true,
  }
}
