import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import MemberList from '../../components/team/MemberList'
import { teamMembers } from '../../data/team'

/** Listado de integrantes (ruta /integrantes). */
function Members() {
  return (
    <>
      <PageHeader
        title="Integrantes"
        description="Listado completo del equipo. Cada integrante tiene su propia página de perfil."
        backTo="/"
        backLabel="Volver a la portada"
      />

      <MemberList members={teamMembers} />

      <p>
        <Link to="/">Volver a la portada</Link>
      </p>
    </>
  )
}

export default Members
