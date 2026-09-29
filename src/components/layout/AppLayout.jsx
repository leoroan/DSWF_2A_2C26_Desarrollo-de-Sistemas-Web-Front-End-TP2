import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import './AppLayout.css'

/**
 * Layout común: mantiene la Sidebar montada mientras el Outlet muestra
 * la página correspondiente a la ruta activa.
 */
function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">
        Ir al contenido principal
      </a>

      <header className="app-layout__header">
        <button
          type="button"
          className="app-layout__toggle"
          aria-expanded={isSidebarOpen}
          aria-controls="app-sidebar"
          onClick={() => setIsSidebarOpen((open) => !open)}
        >
          {isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
        </button>
        <p className="app-layout__header-title">TP2 - Desarrollo de Sistemas Web Front End</p>
      </header>

      <div className="app-layout__body">
        <Sidebar isOpen={isSidebarOpen} onNavigate={closeSidebar} />

        <main id="main-content" className="app-layout__content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
