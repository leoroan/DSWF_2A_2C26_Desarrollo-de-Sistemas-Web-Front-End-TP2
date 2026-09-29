import PageHeader from '../../components/common/PageHeader'
import DataList from '../../components/data/DataList'
import changelog from '../../data/changelog.json'
import '../../components/common/Page.css'

/** Entrada de bitácora con detalle expandible. */
function ChangelogEntry({ entry }) {
  return (
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
  )
}

/** Bitácora del proyecto (ruta /bitacora). */
function Changelog() {
  return (
    <>
      <PageHeader
        title="Bitácora"
        description="Registro del proceso de desarrollo. Las entradas con fecha PENDIENTE deben completarse con fechas reales del equipo."
        backTo="/"
        backLabel="Volver a la portada"
      />

      <DataList items={changelog} renderItem={(entry) => <ChangelogEntry entry={entry} />} />
    </>
  )
}

export default Changelog
