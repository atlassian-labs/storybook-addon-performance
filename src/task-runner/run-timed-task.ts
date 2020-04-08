import { TimedTask, TimedTaskControls, Nullable } from '../types';
import mark from './mark';

async function getDuration(fn: () => Promise<void>): Promise<number> {
  const start: number = performance.now();
  await fn();
  const finish: number = performance.now();
  return finish - start;
}

type TimedArgs = { task: TimedTask; getElement: () => React.ReactElement };

export default async function runTimedTask({ task, getElement }: TimedArgs): Promise<number> {
  let timedDuration: Nullable<number> = null;

  const controls: TimedTaskControls = {
    time: async function time(fn: () => Promise<void>): Promise<void> {
      timedDuration = await getDuration(fn);
    },
  };

  const container: HTMLElement = document.createElement('div');
  document.body.appendChild(container);

  let wholeTaskDuration: number;

  if (task.name === 'interaction_test') {
    wholeTaskDuration = await mark(task.name, () =>
      // @ts-ignore
      getDuration(() => task.run({ getElement, controls, container: document.body })),
    );
  } else {
    wholeTaskDuration = await mark(task.name, () =>
      getDuration(() => task.run({ getElement, controls, container })),
    );
  }

  if (document.body.contains(container)) {
    document.body.removeChild(container);
  }

  return timedDuration != null ? timedDuration : wholeTaskDuration;
}
