import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { RunStaticTaskArgs, RunTimedTaskArgs, StaticTask, TaskGroup, TimedTask } from '../../types';
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

const domElementCount: StaticTask = staticTask({
  name: 'DOM element count',
  description: `
    The more DOM element your component creates, the more work the browser needs to do
  `,
  run: async ({ getElement, container }: RunStaticTaskArgs): Promise<string> => {
    ReactDOM.render(getElement(), container);

    const allChildren: Element[] = Array.from(container.querySelectorAll('*'));

    return String(allChildren.length);
  },
});

// type MemoryInfo = {
//   totalJSHeapSize: number;
//   usedJSHeapSize: number;
//   jsHeapSizeLimit: number;
// };

// const memoryUsage: StaticTask = staticTask({
//   name: 'Runtime memory usage',
//   scale: 'mb',
//   description: `
//     This task records how much memory your component takes to mount into the dom.
//     It does not record how much memory the code that drives your component takes up
//   `,
//   run: async ({
//     getElement,
//     container,
//   }: RunStaticTaskArgs): Promise<string> => {
//     // memory is not on the inbuilt type yet
//     const memory: MemoryInfo | undefined = (performance as any).memory;

//     if (!memory) {
//       return '?';
//     }

//     return 'TODO';

//     // const before: number = performance.memory.usedJSHeapSize;
//     // ReactDOM.render(getElement(), container);
//     // // const array1 = Array.from({ length: 2000000 }).fill(1);
//     // const after: number = performance.memory.usedJSHeapSize;

//     // const bytes: number = after - before;
//     // console.log('bytes', bytes);

//     // return String(bytesToMegaBytes(bytes));
//   },
// });

const group: TaskGroup = {
  groupId: 'Client',
  displayName: 'Client 👩‍💻',
  tasks: [render, reRender, hydrate, domElementCount],
};

export default group;
