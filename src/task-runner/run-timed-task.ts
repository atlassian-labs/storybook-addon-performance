import { TimedTask, TimedControls, Nullable } from '../types';
import mark from './mark';
import withContainer from './with-container';
import withDuration from './with-duration';

type TimedArgs = { task: TimedTask; getElement: () => React.ReactElement };

export default async function runTimedTask({ task, getElement }: TimedArgs): Promise<number> {
  return await withContainer(async (container: HTMLElement) => {
    const duration: number = await withDuration(async (controls: TimedControls) => {
      await mark(task.name, () => task.run({ controls, container, getElement }));
    });

    return duration;
  });
}
