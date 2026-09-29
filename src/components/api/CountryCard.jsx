import './ApiCards.css'

/**
 * Tarjeta con la información de un país obtenida de REST Countries.
 * @param {object} props
 * @param {object} props.country Datos normalizados por el servicio de países.
 */
function CountryCard({ country }) {
  return (
    <div className="api-card">
      <h3 className="api-card__name">
        {country.name} ({country.code})
      </h3>
      {country.flag && (
        <img className="api-card__flag" src={country.flag} alt={`Bandera de ${country.name}`} />
      )}
      <dl className="api-card__data">
        <dt>Capital</dt>
        <dd>{country.capital}</dd>
        <dt>Región</dt>
        <dd>{country.region}</dd>
        <dt>Subregión</dt>
        <dd>{country.subregion || 'No disponible'}</dd>
        <dt>Superficie</dt>
        <dd>{Number.isFinite(country.area) ? `${country.area.toLocaleString('es-AR')} km²` : 'No disponible'}</dd>
        <dt>Población</dt>
        <dd>{country.population ? country.population.toLocaleString('es-AR') : 'PENDIENTE'}</dd>
        <dt>Zonas horarias</dt>
        <dd>{country.timezones?.length ? country.timezones.join(', ') : 'No disponible'}</dd>
        <dt>Idiomas</dt>
        <dd>{country.languages?.length ? country.languages.join(', ') : 'No disponible'}</dd>
        <dt>Monedas</dt>
        <dd>{country.currencies?.length ? country.currencies.join(', ') : 'No disponible'}</dd>
      </dl>
    </div>
  )
}

export default CountryCard
