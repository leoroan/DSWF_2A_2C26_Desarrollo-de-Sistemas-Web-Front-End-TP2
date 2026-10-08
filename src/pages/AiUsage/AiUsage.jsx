import PageHeader from '../../components/common/PageHeader'
import { aiUsage } from '../../data/ai-usage'
import '../../components/common/Page.css'

/** Declaración de uso de IA (ruta /ia). */
function AiUsage() {
  return (
    <>
      <PageHeader
        title="Uso de IA"
        description="Declaración del uso de herramientas de inteligencia artificial durante el proyecto. Se distingue la aplicación utilizada del modelo concreto."
        backTo="/"
        backLabel="Volver a la portada"
      />

      <p>
        La información se edita en <code>src/data/ai-usage.js</code> y se replica en el
        README del repositorio. La tabla es una propuesta coherente con el trabajo
        registrado en git: cada integrante debe validar la herramienta y el modelo
        exactos antes de la entrega.
      </p>

      <div className="table-wrapper">
        <table className="ai-table">
          <caption>Uso de IA por integrante</caption>
          <thead>
            <tr>
              <th scope="col">Integrante</th>
              <th scope="col">Aplicación</th>
              <th scope="col">Modelo</th>
              <th scope="col">Uso</th>
            </tr>
          </thead>
          <tbody>
            {aiUsage.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.member}</td>
                <td>{entry.application}</td>
                <td>{entry.model}</td>
                <td>{entry.task}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AiUsage
