interface FiberNode {
  // Singly Linked List Tree Structure. Full type here https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactInternalTypes.js
  child: FiberNode | null;
  sibling: FiberNode | null;
}

export function traverse(rootNode: FiberNode, callback: (node: FiberNode) => void) {
  function walk(node: FiberNode) {
    // First call the callback on the node.
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
