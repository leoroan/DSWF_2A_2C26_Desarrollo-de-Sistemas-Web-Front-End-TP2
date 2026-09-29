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
        <span className="sidebar__mark" aria-hidden="true">&lt;/&gt;</span>
        <p className="sidebar__team-name">{team.shortName}</p>
        <p className="sidebar__course">{team.course}</p>
      </div>

      <p className="sidebar__label">EXPLORAR EL PROYECTO</p>
      <ul className="sidebar__list">
        {navSections.map((section, index) => (
          <li key={section.to}>
            <NavLink
              to={section.to}
              end={section.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
              }
            >
              <span className="sidebar__number" aria-hidden="true">0{index + 1}</span>
              {section.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <p className="sidebar__footer"><strong>Ideas que se construyen.</strong>Trabajo práctico 02 · Front End</p>
    </nav>
  )
}

export default Sidebar
