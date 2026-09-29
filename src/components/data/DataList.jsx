import './DataList.css'

/**
 * Lista reutilizable de datos.
 * La forma de cada ítem la decide la página, mediante renderItem.
 * @param {object} props
 * @param {Array<object>} props.items
 * @param {(item: object, index: number) => import('react').ReactNode} props.renderItem
 * @param {string} [props.className]
 */
function DataList({ items, renderItem, className = 'data-list' }) {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={item.id ?? index} className={`${className}__item`}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}

export default DataList
