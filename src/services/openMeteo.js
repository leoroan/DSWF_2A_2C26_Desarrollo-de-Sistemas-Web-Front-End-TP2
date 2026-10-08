/**
 * Servicio de la API meteorológica Open-Meteo.
 * Documentación: https://open-meteo.com/
 *
 * Open-Meteo no requiere API key ni secretos: se puede consultar directamente
 * desde el navegador. Este módulo solo construye la URL, ejecuta el fetch,
 * verifica la respuesta y devuelve únicamente los datos que la interfaz usa.
 * El estado de carga y error se maneja en el componente de página.
 */

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

/** Ubicación por defecto: capital del país inicial. */
export const DEFAULT_LOCATION = {
  name: 'Buenos Aires',
  latitude: -34.6037,
  longitude: -58.3816,
}

/** Descripción corta de los códigos meteorológicos de Open-Meteo (WMO). */
const WEATHER_DESCRIPTIONS = {
  0: 'Despejado',
  1: 'Mayormente despejado',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Niebla',
  48: 'Niebla con escarcha',
  51: 'Llovizna ligera',
  53: 'Llovizna moderada',
  55: 'Llovizna intensa',
  61: 'Lluvia ligera',
  63: 'Lluvia moderada',
  65: 'Lluvia intensa',
  71: 'Nieve ligera',
  73: 'Nieve moderada',
  75: 'Nieve intensa',
  80: 'Chubascos ligeros',
  81: 'Chubascos moderados',
  82: 'Chubascos violentos',
  95: 'Tormenta eléctrica',
}

/**
 * Consulta el clima actual de una ubicación.
 * @param {{name: string, latitude: number, longitude: number}} [location]
 * @returns {Promise<{location: string, temperature: number, windSpeed: number, weatherCode: number, description: string, time: string}>}
 * @throws {Error} si la respuesta HTTP no es exitosa o llega incompleta.
 */
export async function getWeather(location = DEFAULT_LOCATION) {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,wind_speed_10m,weather_code',
  })

  const response = await fetch(`${FORECAST_URL}?${params}`)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  const data = await response.json()

  if (!data?.current || typeof data.current.temperature_2m !== 'number') {
    throw new Error('La respuesta no contiene los datos meteorológicos esperados.')
  }

  const { temperature_2m: temperature, wind_speed_10m: windSpeed, weather_code: weatherCode, time } =
    data.current

  return {
    location: location.name,
    temperature,
    windSpeed,
    weatherCode,
    description: WEATHER_DESCRIPTIONS[weatherCode] ?? 'Sin descripción',
    time,
  }
}
