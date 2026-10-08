// El navegador consulta nuestro proxy (/api/countries) sin credenciales.
// Las coordenadas son de la capital de cada país y solo se usan para
// consultar Open-Meteo, que trabaja por latitud/longitud.
const API_URL = '/api/countries'

export const AVAILABLE_COUNTRIES = [
  { id: 'Argentina', label: 'Argentina', capital: 'Buenos Aires', latitude: -34.6037, longitude: -58.3816 },
  { id: 'Brazil', label: 'Brasil', capital: 'Brasilia', latitude: -15.7939, longitude: -47.8828 },
  { id: 'Chile', label: 'Chile', capital: 'Santiago', latitude: -33.4489, longitude: -70.6693 },
  { id: 'Uruguay', label: 'Uruguay', capital: 'Montevideo', latitude: -34.9011, longitude: -56.1645 },
  { id: 'Spain', label: 'España', capital: 'Madrid', latitude: 40.4168, longitude: -3.7038 },
  { id: 'Canada', label: 'Canadá', capital: 'Ottawa', latitude: 45.4215, longitude: -75.6972 },
]

/** País mostrado por defecto. */
export const DEFAULT_COUNTRY = 'Argentina'

/** Devuelve la entrada del selector para un id de país. */
export function getCountryOption(country = DEFAULT_COUNTRY) {
  return AVAILABLE_COUNTRIES.find((option) => option.id === country) ?? AVAILABLE_COUNTRIES[0]
}


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


