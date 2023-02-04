import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import {
  RunStaticTaskArgs,
  RunStaticTaskArgsWithReactRoot,
  RunTimedTaskArgs,
  StaticTask,
  TaskGroup,
  TimedTask,
  Nullable,
  AllowedGroup,
} from '../../types';
import { UnsupportedError } from '../../task-runner/custom-errors';

const render: TimedTask = {
  type: 'timed',
  name: 'Initial render',
  description: `This task records how long ReactDOM.render() takes with your component`,
  run: async ({ getElement, container }: RunTimedTaskArgs): Promise<void> => {
    ReactDOM.render(getElement(), container);
  },
};

const hydrate: TimedTask = {
  type: 'timed',
  name: 'Hydrate',
  description: `
      This task records how long a ReactDOMServer.hydrate() call
      takes. If you are server side rendering a React component then html is
      sent down to the browser. Hydration is the process of React reading through
      the HTML and building up it's internal virtual model. After hydration React
      is able to take over the HTML as if it had done the original render on the client.
  `,
  run: async ({ getElement, controls, container }: RunTimedTaskArgs): Promise<void> => {
    // Not using ReactDOM.render so that React cannot cache the result
    const html: string = ReactDOMServer.renderToString(getElement());
    container.innerHTML = html;

    await controls.time(async function mount() {
      ReactDOM.hydrate(getElement(), container);
    });
  },
};

const reRender: TimedTask = {
  type: 'timed',
  name: 'Re render',
  description: `
      This task records how long it takes to re-render the component with no prop changes.
      Note: You can improve this score quickly by using React.memo near the top of your
      component tree.
  `,
  run: async ({ getElement, controls, container }: RunTimedTaskArgs): Promise<void> => {
    ReactDOM.render(getElement(), container);

    await controls.time(async function mount() {
      ReactDOM.render(getElement(), container);
    });
  },
};

function getAllChildren(container: HTMLElement): Element[] {
  return Array.from(container.querySelectorAll('*'));
}

const domElementCount: StaticTask = {
  type: 'static',
  name: 'DOM element count',
  description: `
    The more DOM element your component creates, the more work the browser needs to do
  `,
  run: async ({ getElement, container }: RunStaticTaskArgs): Promise<string> => {
    ReactDOM.render(getElement(), container);

    const allChildren: Element[] = getAllChildren(container);

    return String(allChildren.length);
  },
};

const domElementCountWithoutSvg: StaticTask = {
  type: 'static',
  name: 'DOM element count (no nested inline svg elements)',
  description: `
    The count of DOM elements excluding inner SVG elements
  `,
  run: async ({ getElement, container }: RunStaticTaskArgs): Promise<string> => {
    ReactDOM.render(getElement(), container);

    const allChildren: Element[] = getAllChildren(container).filter((el: Element) => {
      const parent: Nullable<Element> = el.closest('svg');

      // element not inside of a SVG: include
      if (!parent) {
        return true;
      }

      // current element is the SVG (closest can return self): include
      if (parent === el) {
        return true;
      }

      // we can exclude this one
      return false;
    });

    return String(allChildren.length);
  },
};

const completeRender: TimedTask = {
  type: 'timed',
  name: 'Complete render (mount + layout + paint)',
  description: `
    Time taken for the CPU to become idle after starting ReactDOM.render.
    This will include React's time to create the element and mount it into the DOM,
    as well as subsequent browser layout and painting
  `,
  run: async ({ getElement, container }: RunTimedTaskArgs): Promise<void> => {
    const idle = (window as any).requestIdleCallback;

    if (typeof idle !== 'function') {
      throw new UnsupportedError('requestIdleCallback is not supported in this browser');
    }

    ReactDOM.render(getElement(), container);
    await new Promise((resolve) => {
      idle(() => resolve());
    });
  },
};

interface Fiber {
  // Singly Linked List Tree Structure.
  // Full type here https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactInternalTypes.js
  child: Fiber | null;
  sibling: Fiber | null;
}

export function traverse(rootNode: Fiber, callback: (node: Fiber) => void) {
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
    ReactDOM.render(getElement(), container);

    const fiberRoot = container?._reactRootContainer?._internalRoot?.current;

    let count = 0;
    fiberRoot && traverse(fiberRoot, () => count++);

    return String(count);
  },
};

const group: TaskGroup = {
  groupId: 'Client',
  name: 'Client 👩‍💻',
  tasks: [
    render,
    reRender,
    hydrate,
    domElementCount,
    domElementCountWithoutSvg,
    completeRender,
    reactFiberNodeCount,
  ],
};

export default group;
