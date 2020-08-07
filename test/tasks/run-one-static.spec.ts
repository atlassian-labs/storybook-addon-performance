import { runOneStatic } from '../../src/task-runner';
import { ErrorResult, StaticResult, StaticTask } from '../../src/types';

it('should run static tests', async () => {
  const ourGetNode = () => null;
  const returnValue: string = 'hello old friend';
  const runMock = jest.fn().mockImplementation(() => Promise.resolve(returnValue));

  const task: StaticTask = {
    type: 'static',
    description: 'task',
    name: 'task',
    run: runMock,
  };

  const results: StaticResult | ErrorResult = await runOneStatic({
    task,
    getNode: ourGetNode,
    copies: 1,
  });

  const expected: StaticResult = {
    type: 'static',
    taskName: task.name,
    value: returnValue,
  };

  expect(results).toEqual(expected);
  expect(runMock).toHaveBeenCalledTimes(1);
});
