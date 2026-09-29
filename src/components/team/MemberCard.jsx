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
      <div className="member-card__avatar" aria-hidden="true">{member.name === 'PENDIENTE' ? member.id.split('-').at(-1).padStart(2, '0') : member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
      <h3 className="member-card__name">{member.name === 'PENDIENTE' ? 'Perfil por completar' : member.name}</h3>
      <p className="member-card__role">{member.role === 'PENDIENTE' ? 'Integrante del equipo' : member.role}</p>
      <p className="member-card__description">{member.description.startsWith('PENDIENTE') ? 'Pronto vas a conocer sus intereses, sus ideas y su aporte al proyecto.' : member.description}</p>

      {isLink && (
        <Link className="member-card__link" to={`/integrantes/${member.id}`}>
          Ver perfil
        </Link>
      )}
    </article>
  )
}

export default MemberCard
