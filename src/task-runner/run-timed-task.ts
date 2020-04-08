import { TimedTask, TimedTaskControls, Nullable } from '../types';
import mark from './mark';
import withContainer from './with-container';

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

  const wholeTaskDuration: number = await withContainer(async (container: HTMLElement) => {
    const duration: number = await mark(task.name, () =>
      getDuration(() => task.run({ getElement, controls, container })),
    );
    return duration;
  });

  return timedDuration != null ? timedDuration : wholeTaskDuration;
}
