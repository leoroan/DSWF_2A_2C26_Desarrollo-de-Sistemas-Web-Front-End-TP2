import { team } from '../../data/team'
import '../common/Page.css'

/** Sección introductoria de la portada. */
function TeamIntro() {
  return (
    <section className="page-section" aria-labelledby="team-intro-title">
      <h2 id="team-intro-title">{team.name}</h2>
      <p className="page-lead">{team.description}</p>
      <p>
        La aplicación organiza la información del equipo en secciones navegables: integrantes,
        datos locales del proyecto, consulta a una API pública, árbol de componentes, bitácora
        y declaración de uso de IA.
      </p>
      <p>
        <a href="#team-members">Ver integrantes</a>
      </p>
    </section>
  )
}

export default TeamIntro
