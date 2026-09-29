import { Link, useLocation } from 'react-router-dom'
import '../../components/common/Page.css'

/** Página para rutas inexistentes. Evita que el usuario quede atrapado. */
function NotFound() {
  const location = useLocation()

  return (
    <section className="page-empty">
      <h1>Página no encontrada</h1>
      <p>No existe la ruta &quot;{location.pathname}&quot;.</p>
      <p>
        <Link className="page-button page-button--secondary" to="/">
          Volver a la portada
        </Link>
      </p>
    </section>
  )
}

export default NotFound
