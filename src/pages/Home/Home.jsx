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
        title="Nuestro espacio de trabajo"
        description="Personas, recursos y aprendizajes. Todo conectado en un mismo lugar."
      />

      <TeamIntro />

      <section className="page-section" aria-labelledby="home-members-title">
        <div className="home-section-heading">
          <div><h2 id="home-members-title">Las personas detrás de las ideas</h2><p>Distintas miradas. Un proyecto compartido.</p></div>
          <Link to="/integrantes">Ver integrantes →</Link>
        </div>
        <MemberList members={teamMembers} id="team-members" />
      </section>
    </>
  )
}

export default Home
