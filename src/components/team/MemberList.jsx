import MemberCard from './MemberCard'
import './MemberList.css'

/**
 * Lista reutilizable de integrantes.
 * @param {object} props
 * @param {Array<object>} props.members
 * @param {string} [props.id] id del contenedor (para anclas internas)
 * @param {boolean} [props.isLink] muestra el enlace al perfil individual
 */
function MemberList({ members, id, isLink = true }) {
  return (
    <ul id={id} className="member-list">
      {members.map((member) => (
        <li key={member.id} className="member-list__item">
          <MemberCard member={member} isLink={isLink} />
        </li>
      ))}
    </ul>
  )
}

export default MemberList
