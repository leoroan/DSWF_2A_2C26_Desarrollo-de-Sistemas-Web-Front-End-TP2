/**
 * Servicio de la API de países REST Countries (versión v5).
 * Documentación: https://restcountries.com/
 *
 * IMPORTANTE sobre la autenticación:
 * - La v5 exige una API key. Sin clave, el servidor responde 401.
 * - La clave se lee de la variable de entorno VITE_REST_COUNTRIES_API_KEY.
 * - Si no está definida, se usa la demo key oficial `rc_live_demo`, que la
 *   documentación ofrece para probar la integración sin cuenta ni cuota.
 *
 * Sobre seguridad: cualquier variable `VITE_*` queda incrustada en el bundle
 * del navegador, es decir NO es un secreto real. Por eso el equipo puede
 * configurar su clave pública ahí, pero nunca debe subirse una clave privada
 * al repositorio. La clave real se define en un archivo `.env` local, que está
 * en `.gitignore`; el repositorio solo incluye `.env.example`.
 *
 * Este módulo solo construye la URL, ejecuta el fetch, verifica la respuesta
 * y devuelve únicamente los datos que la interfaz necesita.
 */

const API_URL = 'https://api.restcountries.com/countries/v5'

/** Clave de la configuración de Vite, con la demo key como valor por defecto. */
const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY || 'rc_live_demo'

/** Indica si se está usando la demo key en lugar de una clave del equipo. */
export const isUsingDemoKey = !import.meta.env.VITE_REST_COUNTRIES_API_KEY

/** Países ofrecidos en el selector sencillo de la página. */
export const AVAILABLE_COUNTRIES = [
  { id: 'argentina', label: 'Argentina' },
  { id: 'brasil', label: 'Brasil' },
  { id: 'chile', label: 'Chile' },
  { id: 'uruguay', label: 'Uruguay' },
  { id: 'espana', label: 'España' },
]

/** País mostrado por defecto. */
export const DEFAULT_COUNTRY = 'argentina'

/**
 * Consulta un país por su nombre en español o inglés.
 * @param {string} [country]
 * @returns {Promise<{name: string, code: string, capital: string, region: string, population: number, flag: string, isDemo: boolean}>}
 * @throws {Error} si la respuesta HTTP no es exitosa o no contiene el país.
 */
export async function getCountry(country = DEFAULT_COUNTRY) {
  // La key viaja como parámetro de query porque es el método que la propia
  // documentación indica para navegadores (Authorization no es viable aquí).
  const url = `${API_URL}/name/${encodeURIComponent(country)}?api-key=${API_KEY}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  const payload = await response.json()
  const objects = payload?.data?.objects

  if (!Array.isArray(objects) || objects.length === 0) {
    throw new Error('La API no devolvió el país solicitado.')
  }

  const [countryData] = objects

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
