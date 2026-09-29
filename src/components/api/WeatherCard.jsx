import './ApiCards.css'

/**
 * Tarjeta con el clima actual obtido de Open-Meteo.
 * Muestra únicamente los datos ya transformados por el servicio.
 * @param {object} props
 * @param {{location: string, temperature: number, windSpeed: number, description: string, time: string}} props.weather
 */
function WeatherCard({ weather }) {
  return (
    <div className="api-card">
      <h3 className="api-card__name">{weather.location}</h3>
      <p className="api-card__highlight">{weather.temperature} °C</p>
      <dl className="api-card__data">
        <dt>Estado</dt>
        <dd>{weather.description}</dd>
        <dt>Viento</dt>
        <dd>{weather.windSpeed} km/h</dd>
        <dt>Actualizado</dt>
        <dd>{weather.time}</dd>
      </dl>
    </div>
  )
}

export default WeatherCard
