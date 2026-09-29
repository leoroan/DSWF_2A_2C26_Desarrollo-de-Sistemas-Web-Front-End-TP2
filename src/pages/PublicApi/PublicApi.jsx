import { useCallback, useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import WeatherCard from '../../components/api/WeatherCard'
import CountryCard from '../../components/api/CountryCard'
import { getWeather } from '../../services/openMeteo'
import {
  getCountry,
  AVAILABLE_COUNTRIES,
  DEFAULT_COUNTRY,
} from '../../services/restCountries'
import '../../components/common/Page.css'

/** Estados posibles de cada consulta. */
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}


/** Página de APIs públicas (ruta /api): Open-Meteo y REST Countries. */
function PublicApi() {
  const [weatherStatus, setWeatherStatus] = useState(STATUS.IDLE)
  const [weather, setWeather] = useState(null)

  const [countryStatus, setCountryStatus] = useState(STATUS.IDLE)
  const [country, setCountry] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY)

  // Cada API tiene su propia función: el error de una no afecta a la otra.
  const loadWeather = useCallback(async () => {
    setWeatherStatus(STATUS.LOADING)
    try {
      setWeather(await getWeather())
      setWeatherStatus(STATUS.SUCCESS)
    } catch (error) {
      console.error('Error al consultar Open-Meteo:', error)
      setWeather(null)
      setWeatherStatus(STATUS.ERROR)
    }
  }, [])

  const loadCountry = useCallback(async () => {
    setCountryStatus(STATUS.LOADING)
    try {
      setCountry(await getCountry(selectedCountry))
      setCountryStatus(STATUS.SUCCESS)
    } catch (error) {
      console.error('Error al consultar REST Countries:', error)
      setCountry(null)
      setCountryStatus(STATUS.ERROR)
    }
  }, [selectedCountry])

  useEffect(() => {
    loadWeather()
  }, [loadWeather])

  useEffect(() => {
    loadCountry()
  }, [loadCountry])


  return (
    <>
      <PageHeader
        title="APIs públicas"
        description="Explorá el clima y la información de países. Cada consulta tiene sus propios estados de carga y error."
        backTo="/"
        backLabel="Volver a la portada"
      />

      <section className="page-section" aria-labelledby="open-meteo-title">
        <h2 id="open-meteo-title">Open-Meteo</h2>
        <p>
          Información meteorológica de Buenos Aires, obtenida por coordenadas desde
          api.open-meteo.com.
        </p>

        {weatherStatus === STATUS.LOADING && <p role="status">Cargando clima...</p>}

        {weatherStatus === STATUS.ERROR && (
          <div className="page-empty" role="alert">
            <p>No se pudo obtener la información meteorológica.</p>
            <button type="button" className="page-button" onClick={loadWeather}>
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
              onClick={loadWeather}
            >
              Actualizar
            </button>
          </p>
        )}
      </section>

      <section className="page-section" aria-labelledby="rest-countries-title">
        <h2 id="rest-countries-title">REST Countries</h2>
        <p>Información básica de países, obtenida desde api.restcountries.com (versión v5).</p>

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

        {countryStatus === STATUS.LOADING && <p role="status">Cargando país...</p>}



        {countryStatus === STATUS.ERROR && (
          <div className="page-empty" role="alert">
            <p>No se pudo obtener la información del país.</p>
            <button type="button" className="page-button" onClick={loadCountry}>
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
                onClick={loadCountry}
              >
                Actualizar
              </button>
            </p>
          </>
        )}
      </section>


    </>
  )
}

export default PublicApi

