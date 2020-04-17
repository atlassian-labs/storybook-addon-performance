import { StaticTask, ErrorResult, StaticResult } from '../types';
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
      taskId: task.taskId,
      value,
    };
    return result;
  } catch (e) {
    const result: ErrorResult = {
      type: 'error',
      taskId: task.taskId,
      reason: 'unhandled',
      message: null,
    };
    return result;
  }
}
