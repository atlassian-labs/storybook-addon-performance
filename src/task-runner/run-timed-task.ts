import { TimedTask, TimedControls, Nullable } from '../types';
import mark from './mark';
import withContainer from './with-container';
import withDuration from './with-duration';

type TimedArgs = { task: TimedTask; getElement: () => React.ReactElement };

export default async function runTimedTask({ task, getElement }: TimedArgs): Promise<number> {
  return withContainer((container: HTMLElement) => {
    // wrapping the duration in 'mark' so that the timing is not impacted by the marking
    return mark(task.name, () =>
      withDuration((controls: TimedControls) => task.run({ controls, container, getElement })),
    );
  });
}
