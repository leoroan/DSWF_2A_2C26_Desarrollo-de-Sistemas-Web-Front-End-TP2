import PageHeader from '../../components/common/PageHeader'
import changelog from '../../data/changelog.json'
import '../../components/common/Page.css'
import './Changelog.css'

/** Entrada de bitácora con detalle expandible. */
function ChangelogEntry({ entry }) {
  return (
    <li className="changelog-timeline__item">
      <span className="changelog-timeline__dot" aria-hidden="true" />
      <div className="changelog-entry">
        <details>
          <summary>
            <span className="data-card__name">{entry.title}</span>
            <span className="data-card__category">
              {entry.date} - {entry.status}
            </span>
          </summary>
          <p className="data-card__details">{entry.description}</p>
        </details>
      </div>
    </li>
  )
}

/** Etapa de desarrollo con aportes y línea de tiempo. */
function ChangelogStage({ stage }) {
  return (
    <section className="page-section changelog-stage" aria-labelledby={`${stage.id}-title`}>
      <div className="changelog-stage__header">
        <span className="changelog-stage__badge">{stage.etapa}</span>
        <div>
          <h2 id={`${stage.id}-title`}>{stage.titulo}</h2>
          <p className="changelog-stage__period">{stage.periodo}</p>
          <p className="page-lead">{stage.resumen}</p>
        </div>
      </div>

      <h3 className="changelog-stage__subtitle">Aporte por integrante</h3>
      <ul className="changelog-stage__team">
        {stage.aporte.map((item) => (
          <li key={item.integrante}>
            <strong>{item.integrante}:</strong> {item.detalle}
          </li>
        ))}
      </ul>

      <ol className="changelog-timeline">
        {stage.entradas.map((item) => (
          <ChangelogEntry key={item.id} entry={item} />
        ))}
      </ol>
    </section>
  )
}

/** Bitácora del proyecto (ruta /bitacora). */
function Changelog() {
  return (
    <>
      <PageHeader
        title="Bitácora"
        description="Registro del proceso de desarrollo por etapas, con el aporte de cada integrante y el detalle de lo realizado."
        backTo="/"
        backLabel="Volver a la portada"
      />

      {changelog.map((stage) => (
        <ChangelogStage key={stage.id} stage={stage} />
      ))}
    </>
  )
}

export default Changelog
