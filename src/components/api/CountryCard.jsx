import './ApiCards.css'

/**
 * Tarjeta con la información de un país obtenida de REST Countries.
 * @param {object} props
 * @param {{name: string, code: string, capital: string, region: string, population: number|null, flag: string}} props.country
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
        <dt>Población</dt>
        <dd>{country.population ? country.population.toLocaleString('es-AR') : 'PENDIENTE'}</dd>
      </dl>
    </div>
  )
}

export default CountryCard
