// El navegador consulta nuestro servidor sin recibir la clave privada.
const API_URL = '/api/countries'

export const AVAILABLE_COUNTRIES = [
  { id: 'Canada', label: 'Canadá' },
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
 * @returns {Promise<{name: string, code: string, capital: string, region: string, population: number, flag: string, subregion: string, area: number|null, timezones: string[], languages: string[], currencies: string[]}>}
 * @throws {Error} si la respuesta HTTP no es exitosa o no contiene el país.
 */
export async function getCountry(country = DEFAULT_COUNTRY) {
  const url = `${API_URL}?q=${encodeURIComponent(country)}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const payload = await response.json()
  const objects = payload?.data?.objects

  if (!Array.isArray(objects) || objects.length === 0) {
    throw new Error('La API no devolvió el país solicitado.')
  }

  const wanted = country.toLowerCase()
  const countryData =
    objects.find((item) => item.names?.common?.toLowerCase() === wanted) ?? objects[0]


  return {
    name: countryData.names?.common ?? 'Sin nombre',
    code: countryData.codes?.alpha_2 ?? 'PENDIENTE',
    capital: readCapital(countryData),
    region: countryData.region ?? 'PENDIENTE',
    population: countryData.population ?? null,
    flag: countryData.flag?.url_png ?? '',
    subregion: countryData.subregion || 'No disponible',
    area: Number.isFinite(countryData.area?.kilometers) ? countryData.area.kilometers : null,
    timezones: readList(countryData.timezones, (zone) => zone),
    languages: readList(countryData.languages, (language) => language?.name),
    currencies: readList(countryData.currencies, (currency) => {
      const name = [currency?.name, currency?.code].filter(Boolean).join(' · ')
      return name ? `${name}${currency?.symbol ? ` (${currency.symbol})` : ''}` : ''
    }),
  }
}

/** Normaliza las listas de v5 y descarta entradas vacías. */
function readList(value, label) {
  if (!Array.isArray(value)) return []
  return [...new Set(value.map(label).filter((item) => typeof item === 'string' && item.trim()))]
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


