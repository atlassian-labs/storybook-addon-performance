import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import {
  RunStaticTaskArgs,
  RunTimedTaskArgs,
  StaticTask,
  TaskGroup,
  TimedTask,
  Nullable,
} from '../../types';
import { staticTask, timedTask } from './create';

const render: TimedTask = timedTask({
  name: 'Initial render',
  description: `This task records how long ReactDOM.render() takes with your component`,
  run: async ({ getElement, container }: RunTimedTaskArgs): Promise<void> => {
    ReactDOM.render(getElement(), container);
  },
});

const hydrate: TimedTask = timedTask({
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
});

const reRender: TimedTask = timedTask({
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
});

function getAllChildren(container: HTMLElement): Element[] {
  return Array.from(container.querySelectorAll('*'));
}

const domElementCount: StaticTask = staticTask({
  name: 'DOM element count',
  description: `
    The more DOM element your component creates, the more work the browser needs to do
  `,
  run: async ({ getElement, container }: RunStaticTaskArgs): Promise<string> => {
    ReactDOM.render(getElement(), container);

    const allChildren: Element[] = getAllChildren(container);

    return String(allChildren.length);
  },
});

const domElementCountWithoutSvg: StaticTask = staticTask({
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
});

const group: TaskGroup = {
  groupId: 'Client',
  name: 'Client 👩‍💻',
  tasks: [render, reRender, hydrate, domElementCount, domElementCountWithoutSvg],
};

export default group;
