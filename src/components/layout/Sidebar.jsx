import { NavLink } from 'react-router-dom'
import { team } from '../../data/team'
import { navSections } from '../../data/navigation'
import './Sidebar.css'

/**
 * Sidebar compartida: identidad del equipo, enlaces a las secciones y
 * marcado de la sección activa a través de NavLink.
 */
function Sidebar({ isOpen, onNavigate }) {
  return (
    <nav
      id="app-sidebar"
      className={`sidebar${isOpen ? ' sidebar--open' : ''}`}
      aria-label="Secciones del sitio"
    >
      <div className="sidebar__brand">
        <p className="sidebar__team-name">{team.shortName}</p>
        <p className="sidebar__course">{team.course}</p>
      </div>

      <ul className="sidebar__list">
        {navSections.map((section) => (
          <li key={section.to}>
            <NavLink
              to={section.to}
              end={section.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
              }
            >
              {section.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <p className="sidebar__footer">TP2 - PENDIENTE deploy</p>
    </nav>
  )
}

export default Sidebar
