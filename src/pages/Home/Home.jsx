import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import TeamIntro from '../../components/team/TeamIntro'
import MemberList from '../../components/team/MemberList'
import { teamMembers } from '../../data/team'

/** Portada del equipo (ruta /). */
function Home() {
  return (
    <>
      <PageHeader
        title="Inicio"
        description="Portada del proyecto. Conocé al equipo y sus secciones."
      />

      <TeamIntro />

      <section className="page-section" aria-labelledby="home-members-title">
        <h2 id="home-members-title">Integrantes</h2>
        <MemberList members={teamMembers} id="team-members" />
        <p>
          <Link to="/integrantes">Ver todos los integrantes</Link>
        </p>
      </section>
    </>
  )
}

export default Home
