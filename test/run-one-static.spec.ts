import { staticTask } from '../src/tasks/create';
import { runOneStatic } from '../src/task-runner';
import { StaticResult, StaticTask, TaskGroup } from '../src/types';

it('should run static tests', async () => {
  const ourGetNode = () => null;
  const returnValue: string = 'hello old friend';
  const runMock = jest.fn().mockImplementation(() => Promise.resolve(returnValue));

  const task: StaticTask = staticTask({
    description: 'task',
    name: 'task',
    run: runMock,
  });
  const group: TaskGroup = {
    name: 'Test Group',
    timed: [],
    static: [],
  };

  const results: StaticResult = await runOneStatic({
    task,
    group,
    getNode: ourGetNode,
    copies: 1,
  });

  const expected: StaticResult = {
    taskName: task.name,
    groupName: group.name,
    value: returnValue,
  };

  expect(results).toEqual(expected);
  expect(runMock).toHaveBeenCalledTimes(1);
});
