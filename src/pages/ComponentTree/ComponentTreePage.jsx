import PageHeader from '../../components/common/PageHeader'
import ComponentTree from '../../components/tree/ComponentTree'
import { componentTree } from '../../data/componentTree'
import '../../components/common/Page.css'

/** Página del árbol de componentes (ruta /arbol). */
function ComponentTreePage() {
  return (
    <>
      <PageHeader
        title="Árbol de componentes"
        description="Jerarquía real de componentes de la aplicación. Se actualiza en src/data/componentTree.js."
        backTo="/"
        backLabel="Volver a la portada"
      />

      <p>Desplegá cada nodo para ver sus componentes hijos.</p>

      <ComponentTree tree={componentTree} />
    </>
  )
}

export default ComponentTreePage
