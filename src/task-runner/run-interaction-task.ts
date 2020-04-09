import ReactDOM from 'react-dom';
import { InteractionTask, TimedControls } from '../types';
import mark from './mark';
import withContainer from './with-container';
import withDuration from './with-duration';

type Args = { task: InteractionTask; getElement: () => React.ReactElement };

export default async function runInteractionTask({ task, getElement }: Args): Promise<number> {
  return withContainer(async (container: HTMLElement) => {
    ReactDOM.render(getElement(), container);

    const duration: number = await mark(task.name, () =>
      withDuration((controls: TimedControls) => task.run({ controls, container })),
    );

    ReactDOM.unmountComponentAtNode(container);
    return duration;
  });
}
