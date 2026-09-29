import { Link } from 'react-router-dom'
import './MemberCard.css'

/**
 * Tarjeta reutilizable de un integrante.
 * @param {object} props
 * @param {object} props.member integrante de src/data/team.js
 * @param {boolean} [props.isLink] muestra el enlace al perfil individual
 */
function MemberCard({ member, isLink = true }) {
  return (
    <article className="member-card">
      <h3 className="member-card__name">{member.name}</h3>
      <p className="member-card__role">{member.role}</p>
      <p className="member-card__description">{member.description}</p>

      {isLink && (
        <Link className="member-card__link" to={`/integrantes/${member.id}`}>
          Ver perfil
        </Link>
      )}
    </article>
  )
}

export default MemberCard
