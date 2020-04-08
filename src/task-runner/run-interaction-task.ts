import ReactDOM from 'react-dom';
import { TimedControls, Nullable, InteractionTask } from '../types';
import mark from './mark';
import withContainer from './with-container';
import withDuration from './with-duration';

type Args = { task: InteractionTask; getElement: () => React.ReactElement };

export default async function runInteractionTask({ task, getElement }: Args): Promise<number> {
  return await withContainer(async (container: HTMLElement) => {
    ReactDOM.render(getElement(), container);
    console.log('RUN INTERACTION TASK', container);

    const duration: number = await withDuration(async (controls: TimedControls) => {
      await mark(task.name, () => task.run({ controls, container }));
    });

    ReactDOM.unmountComponentAtNode(container);
    return duration;
  });
}
