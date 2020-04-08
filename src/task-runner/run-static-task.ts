import { StaticTask } from '../types';
import mark from './mark';
import withContainer from './with-container';

type StaticArgs = { task: StaticTask; getElement: () => React.ReactElement };

export default async function runStaticTask({ task, getElement }: StaticArgs): Promise<string> {
  const result: string = await withContainer(async (container: HTMLElement) => {
    return await mark(task.name, () => task.run({ getElement, container }));
  });
  return result;
}
