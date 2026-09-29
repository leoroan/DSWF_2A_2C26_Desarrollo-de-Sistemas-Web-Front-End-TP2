/**
 * Servicio de la API de países REST Countries (versión v5).
 * Documentación: https://restcountries.com/
 *
 * Sobre la autenticación:
 * - La v5 exige una API key. Sin clave, el servidor responde 401.
 * - La clave se lee de la variable de entorno VITE_REST_COUNTRIES_API_KEY.
 * - Si no está definida, se usa la demo key oficial `rc_live_demo`.
 *
 * Sobre CORS (importante para que funcione en el navegador):
 * - La API bloquea por default las peticiones que llegan desde un navegador.
 * - Solo funcionan si el HOSTNAME de la página está en la lista "allowed origins"
 *   de la API key, que se configura en https://restcountries.com/api-keys.
 * - En ese campo se escriben solo hostnames, SIN protocolo, puerto ni ruta:
 *   `localhost`, `127.0.0.1`, `tu-proyecto.vercel.app`. Varios van separados por
 *   comas. El subdominio cuenta: `www.ejemplo.com` es distinto de `ejemplo.com`.
 * - Si falta el hostname, la API responde 403 con el código `originNotAllowed`.
 * - Ojo: las peticiones sin header `Origin` (curl, Node) no pasan por CORS, así
 *   que la API puede funcionar en la terminal y fallar en el navegador.
 *
 * Sobre seguridad: las variables `VITE_*` de Vite se incrustan en el bundle
 * del navegador, así que esta clave NO es un secreto real: es pública para
 * quien use la app. La clave real se define en un archivo `.env` local, que
 * está en `.gitignore`; al repositorio solo se sube `.env.example`.
 *
 * Este módulo solo construye la URL, ejecuta el fetch, verifica la respuesta
 * y devuelve únicamente los datos que la interfaz necesita.
 */

const API_URL = 'https://api.restcountries.com/countries/v5'

/** Clave de la configuración de Vite, con la demo key como valor por defecto. */
const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY || 'rc_live_demo'

/** Indica si se está usando la demo key en lugar de la clave del equipo. */
export const isUsingDemoKey = !import.meta.env.VITE_REST_COUNTRIES_API_KEY

/**
 * Países ofrecidos en el selector sencillo de la página.
 * Se usan los nombres en inglés porque son los que la API reconoce.
 */
export const AVAILABLE_COUNTRIES = [
  { id: 'Argentina', label: 'Argentina' },
  { id: 'Brazil', label: 'Brasil' },
  { id: 'Chile', label: 'Chile' },
  { id: 'Uruguay', label: 'Uruguay' },
  { id: 'Spain', label: 'España' },
]

/** País mostrado por defecto. */
export const DEFAULT_COUNTRY = 'Argentina'


/**
 * Consulta un país por nombre.
 *
 * Se usa el parámetro `q` de búsqueda porque la ruta `/name/{pais}` está
 * restringida en los planes con clave. La búsqueda puede devolver varios
 * resultados (por ejemplo "Spain" también trae Trinidad and Tobago), así que
 * se toma el primer país cuyo nombre coincide exactamente con el buscado.
 *
 * @param {string} [country]
 * @returns {Promise<{name: string, code: string, capital: string, region: string, population: number, flag: string, isDemo: boolean}>}
 * @throws {Error} si la respuesta HTTP no es exitosa o no contiene el país.
 */
export async function getCountry(country = DEFAULT_COUNTRY) {
  const url = `${API_URL}?q=${encodeURIComponent(country)}`

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  })

  if (!response.ok) {
    // 403 en esta API significa que el origen (dominio) no está habilitado
    // para esta clave. Se marca el error para que la interfaz lo explique.
    const error = new Error(`HTTP ${response.status} - ${response.statusText}`)

    if (response.status === 403) {
      error.code = 'originNotAllowed'
    }

    throw error
  }

  const payload = await response.json()
  const objects = payload?.data?.objects

  if (!Array.isArray(objects) || objects.length === 0) {
    throw new Error('La API no devolvió el país solicitado.')
  }

  const wanted = country.toLowerCase()
  const countryData =
    objects.find((item) => item.names?.common?.toLowerCase() === wanted) ?? objects[0]

  // Con la demo key la API responde con un objeto de ejemplo y este aviso.
  const isDemo = Boolean(payload?.data?._demo)

  return {
    name: countryData.names?.common ?? 'Sin nombre',
    code: countryData.codes?.alpha_2 ?? 'PENDIENTE',
    capital: readCapital(countryData),
    region: countryData.region ?? 'PENDIENTE',
    population: countryData.population ?? null,
    flag: countryData.flag?.url_png ?? '',
    isDemo,
  }
}

/**
 * La capital puede venir como lista (`capitals: [{ name }]`) o como texto
 * plano (`capital: "..."`). Se contempla cualquiera de las dos formas para no
 * romper la lectura si la API cambia la representación del campo.
 */
function readCapital(country) {
  const capitals = country.capitals ?? country.capital

  if (typeof capitals === 'string') {
    return capitals
  }

  const first = Array.isArray(capitals) ? capitals[0] : capitals

  return first?.name ?? 'Sin capital'
}
