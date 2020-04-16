import { runOneStatic } from '../../src/task-runner';
import { StaticResult, StaticTask } from '../../src/types';

it('should run static tests', async () => {
  const ourGetNode = () => null;
  const returnValue: string = 'hello old friend';
  const runMock = jest.fn().mockImplementation(() => Promise.resolve(returnValue));

  const task: StaticTask = {
    taskId: 'task',
    type: 'static',
    description: 'task',
    name: 'task',
    run: runMock,
  };

  const results: StaticResult = await runOneStatic({
    task,
    getNode: ourGetNode,
    copies: 1,
  });

  const expected: StaticResult = {
    type: 'static',
    taskId: task.taskId,
    value: returnValue,
  };

  expect(results).toEqual(expected);
  expect(runMock).toHaveBeenCalledTimes(1);
});
