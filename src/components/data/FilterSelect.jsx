/**
 * Selector de categoría. Las opciones llegan generadas desde los datos.
 * @param {object} props
 * @param {string[]} props.categories
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} props.id
 */
function FilterSelect({ categories, value, onChange, id = 'filter-category' }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        Categoría
      </label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterSelect
