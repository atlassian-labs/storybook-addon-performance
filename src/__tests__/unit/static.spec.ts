import { TaskGroup, TaskGroupResult, StaticTask } from '../../types';
import { runAll } from '../../task-runner/runner';
import { staticTask } from '../../tasks/create';

it('should run static tests', async () => {
  const ourGetNode = () => null;
  const returnValue: string = 'hello old friend';
  const runMock = jest
    .fn()
    .mockImplementation(() => Promise.resolve(returnValue));

  const task: StaticTask = staticTask({
    description: 'task',
    name: 'task',
    run: runMock,
  });
  const group: TaskGroup = {
    groupId: 'group-1',
    name: 'group',
    static: [task],
    timed: [],
  };
  const results: TaskGroupResult[] = await runAll({
    groups: [group],
    getNode: ourGetNode,
    samples: 1,
    copies: 1,
  });

  const expected: TaskGroupResult = {
    groupId: group.groupId,
    timed: {},
    static: {
      [task.taskId]: {
        taskId: task.taskId,
        value: returnValue,
      },
    },
  };

  expect(results).toEqual([expected]);
  expect(runMock).toHaveBeenCalledTimes(1);
  expect(runMock).toHaveBeenCalledWith(ourGetNode);
});
