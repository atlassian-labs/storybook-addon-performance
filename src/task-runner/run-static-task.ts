import { StaticTask } from '../types';
import mark from './mark';

type StaticArgs = { task: StaticTask; getElement: () => React.ReactElement };

export default async function runStaticTask({ task, getElement }: StaticArgs): Promise<string> {
  const container: HTMLElement = document.createElement('div');
  document.body.appendChild(container);

  const result: string = await mark(task.name, () => task.run({ getElement, container }));

  if (document.body.contains(container)) {
    document.body.removeChild(container);
  }

  return result;
}
