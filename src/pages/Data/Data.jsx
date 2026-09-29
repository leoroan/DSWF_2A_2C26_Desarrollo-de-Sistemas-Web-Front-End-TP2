import { useMemo, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import SearchInput from '../../components/data/SearchInput'
import FilterSelect from '../../components/data/FilterSelect'
import DataList from '../../components/data/DataList'
import DataCard from '../../components/data/DataCard'
import records from '../../data/records.json'
import '../../components/common/Page.css'

/** Todas las categorías presentes en el JSON, sin duplicarlas a mano. */
const categories = [...new Set(records.map((record) => record.category))].sort()

const ALL_CATEGORIES = ''

/** Página de datos locales (ruta /datos). */
function Data() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase()

    return records.filter((record) => {
      const matchesCategory = category === ALL_CATEGORIES || record.category === category
      const matchesSearch =
        query === '' ||
        [record.name, record.category, record.description, record.details].some((value) =>
          value.toLowerCase().includes(query),
        )

      return matchesCategory && matchesSearch
    })
  }, [search, category])

  const isFiltered = search !== '' || category !== ALL_CATEGORIES

  const clearFilters = () => {
    setSearch('')
    setCategory(ALL_CATEGORIES)
  }

  return (
    <>
      <PageHeader
        title="Datos"
        description={`${records.length} registros cargados desde src/data/records.json y renderizados dinámicamente.`}
        backTo="/"
        backLabel="Volver a la portada"
      />

      <div className="page-toolbar">
        <SearchInput value={search} onChange={setSearch} />
        <FilterSelect
          categories={categories}
          value={category}
          onChange={setCategory}
        />
        {isFiltered && (
          <button type="button" className="page-button page-button--secondary" onClick={clearFilters}>
            Limpiar filtros
          </button>
        )}
      </div>

      <p role="status">
        {filteredRecords.length} de {records.length} registros mostrados.
      </p>

      {filteredRecords.length > 0 ? (
        <DataList items={filteredRecords} renderItem={(record) => <DataCard record={record} />} />
      ) : (
        <div className="page-empty">
          <p>No se encontraron resultados.</p>
          <button type="button" className="page-button page-button--secondary" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>
      )}
    </>
  )
}

export default Data
