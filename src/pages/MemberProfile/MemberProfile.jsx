import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import MemberCard from '../../components/team/MemberCard'
import { getMemberById } from '../../data/team'
import '../../components/common/Page.css'
import FondoCiudad from '../../components/layout/FondoCiudad';


/** Perfil individual de un integrante (ruta /integrantes/:id). */
function MemberProfile() {
  const { id } = useParams()
  const [showDetails, setShowDetails] = useState(false)

  const member = getMemberById(id)

  if (!member) {
    return (
      <section className="page-empty">
        <h1>Integrante no encontrado.</h1>
        <p>El identificador &quot;{id}&quot; no corresponde a ningún integrante del equipo.</p>
        <p>
          <Link className="page-button page-button--secondary" to="/integrantes">
            Volver a integrantes
          </Link>
        </p>
      </section>
    )
  }

  const hasDetails =
    (member.technologies?.length ?? 0) > 0 || (member.responsibilities?.length ?? 0) > 0

  return (
    <>
      <PageHeader
        title={member.name}
        description="Perfil individual del integrante."
        backTo="/integrantes"
        backLabel="Volver a integrantes"
      />

      <FondoCiudad>
        <div style={{ transform: 'translateY(50px)', width: '100%', maxWidth: '450px', padding: '0 20px', zIndex: 5 }}>
          <MemberCard member={member} isLink={false} />
        </div>
      </FondoCiudad>

      {hasDetails && (
        <section className="page-section" aria-labelledby="member-details-title">
          <h2 id="member-details-title">Detalles</h2>
          <button
            type="button"
            className="page-button page-button--secondary"
            aria-expanded={showDetails}
            onClick={() => setShowDetails((visible) => !visible)}
          >
            {showDetails ? 'Ocultar detalles' : 'Mostrar detalles'}
          </button>

          {showDetails && (
            <div>
              {member.technologies?.length > 0 && (
                <>
                  <h3>Tecnologías</h3>
                  <ul>
                    {member.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </>
              )}
              {member.responsibilities?.length > 0 && (
                <>
                  <h3>Responsabilidades</h3>
                  <ul>
                    {member.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </>
              )}
              {member.github && (
                <p>
                  GitHub:{' '}
                  <a href={member.github} target="_blank" rel="noreferrer">
                    {member.github}
                  </a>
                </p>
              )}
            </div>
          )}
        </section>
      )}

      <p>
        <Link to="/integrantes">Volver a integrantes</Link> | <Link to="/">Ir a la portada</Link>
      </p>
    </>
  )
}

export default MemberProfile
