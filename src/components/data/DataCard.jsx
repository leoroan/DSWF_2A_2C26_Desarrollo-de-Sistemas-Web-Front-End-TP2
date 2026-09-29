import './DataCard.css'

/**
 * Tarjeta de un registro local con detalle expandible.
 * El detalle se implementa con <details> nativo para consultar
 * información adicional sin complejidad visual extra.
 * @param {object} props
 * @param {object} props.record registro de src/data/records.json
 */
function DataCard({ record }) {
  return (
    <div className="data-card">
      <details>
        <summary>
          <span className="data-card__name">{record.name}</span>
          <span className="data-card__category">{record.category}</span>
        </summary>
        <p className="data-card__description">{record.description}</p>
        <p className="data-card__details">{record.details}</p>
        {record.link && (
          <a href={record.link} target="_blank" rel="noreferrer">
            Referencia ({record.link})
          </a>
        )}
      </details>
    </div>
  )
}

export default DataCard
