import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
 */
function Router() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
