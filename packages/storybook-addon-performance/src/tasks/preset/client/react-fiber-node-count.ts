import { RunStaticTaskArgsWithReactRoot, StaticTask } from '../../../types';
import { IS_REACT_18_AND_NEWER } from '../../../util/react';
import { renderAndWaitForIdle } from './helpers';
import { UnsupportedError } from '../../../task-runner/custom-errors';

type Fiber = {
  // Singly Linked List Tree Structure.
  // Full type here https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactInternalTypes.js
  child: Fiber | null;
  sibling: Fiber | null;
};

function traverse(rootNode: Fiber, callback: (node: Fiber) => void) {
  function walk(node: Fiber) {
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

const reactFiberNodeCount: StaticTask = {
  type: 'static',
  name: 'React Fiber node count',
  description: `
    The number of React Elements or internal objects ("fibers") that hold information about the component tree state.
  `,
  run: async ({ getElement, container }: RunStaticTaskArgsWithReactRoot): Promise<string> => {
    // TODO needs research, maybe provide different container property for React 18?
    if (IS_REACT_18_AND_NEWER) {
      throw new UnsupportedError('This task is currently not supported with React 18 and newer');
    }

    await renderAndWaitForIdle({ getElement, container });

    const fiberRoot = container?._reactRootContainer?._internalRoot?.current;

    let count = 0;
    fiberRoot && traverse(fiberRoot, () => count++);

    return String(count);
  },
};

export default reactFiberNodeCount;
