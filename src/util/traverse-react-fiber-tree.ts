export function traverse(rootNode: any, callback: (node: any) => void) {
  function walk(node: any) {
    // First call the callback on the root node.
    callback(node);

    if (!node.child && !node.sibling) {
      return;
    }

    // Then recursively call the walk function on each child and sibling.
    node.child && walk(node.child);
    node.sibling && walk(node.sibling);
  }

  walk(rootNode);
}
