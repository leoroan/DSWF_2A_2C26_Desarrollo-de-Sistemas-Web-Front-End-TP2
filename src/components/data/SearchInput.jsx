/**
 * Campo de búsqueda textual controlado por el componente padre.
 * @param {object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} props.id id del input (para asociar el label)
 */
function SearchInput({ value, onChange, id = 'search-input' }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        Buscar
      </label>
      <input
        id={id}
        type="search"
        value={value}
        placeholder="Buscar por nombre, categoría o descripción"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchInput
