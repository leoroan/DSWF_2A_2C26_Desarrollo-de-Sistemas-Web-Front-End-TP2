import './ComponentTree.css'

/**
 * Nodo del árbol de componentes.
 * Se usa <details> nativo para expandir y contraer sin instalar librerías.
 * @param {object} props
 * @param {object} props.node nodo con { name, file, children }
 * @param {boolean} [props.isRoot]
 */
function TreeNode({ node, isRoot = false }) {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0

  if (!hasChildren) {
    return (
      <li className="tree__node">
        <span className="tree__name">{node.name}</span>
        <span className="tree__file">{node.file}</span>
      </li>
    )
  }

  return (
    <li className="tree__node">
      <details open={isRoot}>
        <summary>
          <span className="tree__name">{node.name}</span>
          <span className="tree__file">{node.file}</span>
        </summary>
        <ul className="tree__children">
          {node.children.map((child) => (
            <TreeNode key={child.name} node={child} />
          ))}
        </ul>
      </details>
    </li>
  )
}

/** Árbol de componentes de la aplicación. */
function ComponentTree({ tree }) {
  return (
    <ul className="tree">
      <TreeNode node={tree} isRoot />
    </ul>
  )
}

export default ComponentTree
