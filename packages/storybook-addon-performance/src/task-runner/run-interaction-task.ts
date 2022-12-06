import { InteractionTask, TimedControls } from '../types';
import mark from './mark';
import withContainer from './with-container';
import withDuration from './with-duration';
import { unmountRootAtContainer } from '../util/react';
import { renderAndWaitForIdle } from '../tasks/preset/client/helpers';

type Args = { task: InteractionTask; getElement: () => React.ReactElement };

export default async function runInteractionTask({ task, getElement }: Args): Promise<number> {
  return withContainer(async (container: HTMLElement) => {
    await renderAndWaitForIdle({ getElement, container });

    const duration: number = await mark(task.name, () =>
      withDuration((controls: TimedControls) => task.run({ controls, container })),
    );

    unmountRootAtContainer(container);

    return duration;
  });
}
