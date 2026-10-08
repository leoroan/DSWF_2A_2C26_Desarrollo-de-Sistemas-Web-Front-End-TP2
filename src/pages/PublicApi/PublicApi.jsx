import { useCallback, useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import WeatherCard from '../../components/api/WeatherCard'
import CountryCard from '../../components/api/CountryCard'
import { getWeather } from '../../services/openMeteo'
import {
  getCountry,
  AVAILABLE_COUNTRIES,
  DEFAULT_COUNTRY,
  getCountryOption,
} from '../../services/restCountries'
import '../../components/common/Page.css'

/** Estados posibles de cada consulta. */
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

/** Página de APIs públicas (ruta /api): país elegido + clima de su capital. */
function PublicApi() {
  const [weatherStatus, setWeatherStatus] = useState(STATUS.IDLE)
  const [weather, setWeather] = useState(null)

  const [countryStatus, setCountryStatus] = useState(STATUS.IDLE)
  const [country, setCountry] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY)

  const selectedOption = getCountryOption(selectedCountry)

  // El clima depende del país elegido: cada cambio pide país y clima en paralelo.
  // Cada API tiene su propio estado: el error de una no afecta a la otra.
  const loadCountryAndWeather = useCallback(async () => {
    const option = getCountryOption(selectedCountry)
    setCountryStatus(STATUS.LOADING)
    setWeatherStatus(STATUS.LOADING)
    setCountry(null)
    setWeather(null)

    const [countryResult, weatherResult] = await Promise.allSettled([
      getCountry(option.id),
      getWeather({ name: option.capital, latitude: option.latitude, longitude: option.longitude }),
    ])

    if (countryResult.status === 'fulfilled') {
      setCountry(countryResult.value)
      setCountryStatus(STATUS.SUCCESS)
    } else {
      console.error('Error al consultar REST Countries:', countryResult.reason)
      setCountryStatus(STATUS.ERROR)
    }

    if (weatherResult.status === 'fulfilled') {
      setWeather(weatherResult.value)
      setWeatherStatus(STATUS.SUCCESS)
    } else {
      console.error('Error al consultar Open-Meteo:', weatherResult.reason)
      setWeatherStatus(STATUS.ERROR)
    }
  }, [selectedCountry])

  useEffect(() => {
    loadCountryAndWeather()
  }, [loadCountryAndWeather])

  return (
    <>
      <PageHeader
        title="APIs públicas"
        description="Elegí un país para ver su información y la temperatura actual de su capital. Cada consulta tiene sus propios estados de carga y error."
        backTo="/"
        backLabel="Volver a la portada"
      />

      <div className="page-toolbar">
        <div className="field">
          <label className="field__label" htmlFor="country-select">
            País
          </label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}
          >
            {AVAILABLE_COUNTRIES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <p className="page-lead">Clima de {selectedOption.capital} vía Open-Meteo.</p>
      </div>

      <section className="page-section" aria-labelledby="rest-countries-title">
        <h2 id="rest-countries-title">REST Countries: {selectedOption.label}</h2>
        <p>Información básica del país, obtenida desde api.restcountries.com (versión v5).</p>

        {countryStatus === STATUS.LOADING && <p role="status">Cargando país...</p>}

        {countryStatus === STATUS.ERROR && (
          <div className="page-empty" role="alert">
            <p>No se pudo obtener la información del país.</p>
            <button type="button" className="page-button" onClick={loadCountryAndWeather}>
              Reintentar
            </button>
          </div>
        )}

        {countryStatus === STATUS.SUCCESS && country && (
          <>
            <CountryCard country={country} />
            <p>
              <button
                type="button"
                className="page-button page-button--secondary"
                onClick={loadCountryAndWeather}
              >
                Actualizar
              </button>
            </p>
          </>
        )}
      </section>

      <section className="page-section" aria-labelledby="open-meteo-title">
        <h2 id="open-meteo-title">Open-Meteo: {selectedOption.capital}</h2>
        <p>
          Temperatura actual de la capital, obtenida por coordenadas desde
          api.open-meteo.com.
        </p>

        {weatherStatus === STATUS.LOADING && <p role="status">Cargando clima...</p>}

        {weatherStatus === STATUS.ERROR && (
          <div className="page-empty" role="alert">
            <p>No se pudo obtener la información meteorológica.</p>
            <button type="button" className="page-button" onClick={loadCountryAndWeather}>
              Reintentar
            </button>
          </div>
        )}

        {weatherStatus === STATUS.SUCCESS && weather && <WeatherCard weather={weather} />}

        {weatherStatus === STATUS.SUCCESS && (
          <p>
            <button
              type="button"
              className="page-button page-button--secondary"
              onClick={loadCountryAndWeather}
            >
              Actualizar
            </button>
          </p>
        )}
      </section>
    </>
  )
}

export default PublicApi

