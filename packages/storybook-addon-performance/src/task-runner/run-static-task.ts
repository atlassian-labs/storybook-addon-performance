import { ErrorResult, StaticResult, StaticTask } from '../types';
import getErrorResult from './get-error-result';
import printError from './print-error';
import mark from './mark';
import withContainer from './with-container';

type StaticArgs = { task: StaticTask; getElement: () => React.ReactElement };

async function runStaticTask({ task, getElement }: StaticArgs): Promise<string> {
  return await withContainer(async (container: HTMLElement) => {
    return await mark(task.name, () => task.run({ getElement, container }));
  });
}

export async function getResultForStaticTask({
  task,
  getElement,
}: StaticArgs): Promise<StaticResult | ErrorResult> {
  try {
    const value: string = await runStaticTask({ task, getElement });
    const result: StaticResult = {
      type: 'static',
      taskName: task.name,
      value,
    };
    return result;
  } catch (error) {
    printError({ task, error });
    return getErrorResult({ task, error });
  }
}
