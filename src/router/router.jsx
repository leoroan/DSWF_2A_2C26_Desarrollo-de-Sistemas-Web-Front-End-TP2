import { BrowserRouter, Route, Routes } from 'react-router'
import AppLayout from '../components/layout/AppLayout'
import Home from '../pages/Home/Home'
import Members from '../pages/Members/Members'
import MemberProfile from '../pages/MemberProfile/MemberProfile'
import Data from '../pages/Data/Data'
import PublicApi from '../pages/PublicApi/PublicApi'
import ComponentTreePage from '../pages/ComponentTree/ComponentTreePage'
import Changelog from '../pages/Changelog/Changelog'
import AiUsage from '../pages/AiUsage/AiUsage'
import NotFound from '../pages/NotFound/NotFound'

/**
 * Navegación de la aplicación.
 * AppLayout mantiene la Sidebar y renderiza la página en el Outlet.
 *
 * Se usa react-router v7 en modo declarativo: BrowserRouter, Routes y Route
 * organizan las rutas y Outlet renderiza la página de la ruta activa.
 * En v7 las actualizaciones de estado del router ya se envuelven en
 * React.startTransition por defecto, por lo que no hace falta el prop `future`.
 */
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="integrantes" element={<Members />} />
          <Route path="integrantes/:id" element={<MemberProfile />} />
          <Route path="datos" element={<Data />} />
          <Route path="api" element={<PublicApi />} />
          <Route path="arbol" element={<ComponentTreePage />} />
          <Route path="bitacora" element={<Changelog />} />
          <Route path="ia" element={<AiUsage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
