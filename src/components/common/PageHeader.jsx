import { Link } from 'react-router-dom'
import './Page.css'

/**
 * Encabezado común de página con enlace de retorno.
 * Evita depender del botón "Atrás" del navegador.
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {string} [props.backTo] ruta del enlace de retorno
 * @param {string} [props.backLabel]
 */
function PageHeader({ title, description, backTo, backLabel = 'Volver' }) {
  return (
    <header className="page-header">
      {backTo && (
        <p className="page-header__back">
          <Link to={backTo}>{backLabel}</Link>
        </p>
      )}
      <h1 className="page-header__title">{title}</h1>
      {description && <p className="page-lead">{description}</p>}
    </header>
  )
}

export default PageHeader
