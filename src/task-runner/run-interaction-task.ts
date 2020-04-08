import ReactDOM from 'react-dom';
import { TimedControls, Nullable, InteractionTask } from '../types';
import mark from './mark';
import withContainer from './with-container';

async function getDuration(fn: () => Promise<void>): Promise<number> {
  const start: number = performance.now();
  await fn();
  const finish: number = performance.now();
  return finish - start;
}

type Args = { task: InteractionTask; getElement: () => React.ReactElement };

export default async function runInteractionTask({ task, getElement }: Args): Promise<number> {
  let timedDuration: Nullable<number> = null;

  const controls: TimedControls = {
    time: async function time(fn: () => Promise<void>): Promise<void> {
      timedDuration = await getDuration(fn);
    },
  };

  const wholeTaskDuration: number = await withContainer(async (container: HTMLElement) => {
    // We render the component into a container before we start timing
    ReactDOM.render(getElement(), container);

    const duration: number = await mark(task.name, () =>
      getDuration(() => task.run({ controls, container })),
    );

    ReactDOM.unmountComponentAtNode(container);

    return duration;
  });

  return timedDuration != null ? timedDuration : wholeTaskDuration;
}
