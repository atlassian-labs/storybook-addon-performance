import { TaskGroup, TimedTask, TaskGroupResult, RunTimedTaskArgs } from '../src/types';
import { runAll } from '../src/task-runner/runner';
import { timedTask } from '../src/tasks/create';

it('should run timed tests', async () => {
  const ourGetNode = () => null;
  const mock = jest.fn();

  const task: TimedTask = timedTask({
    name: 'task',
    description: 'task',
    run: ({ getElement }: RunTimedTaskArgs) => Promise.resolve().then(() => mock(getElement)),
  });
  const group: TaskGroup = {
    groupId: 'group-1',
    name: 'group',
    static: [],
    timed: [task],
  };
  const results: TaskGroupResult[] = await runAll({
    groups: [group],
    getNode: ourGetNode,
    samples: 1,
    copies: 1,
  });

  const expected: TaskGroupResult = {
    groupId: group.groupId,
    static: {},
    timed: {
      [task.taskId]: {
        taskId: task.taskId,
        averageMs: expect.any(Number) as number,
        samples: 1,
        variance: {
          standardDeviation: 0,
          upperPercentage: 0,
          lowerPercentage: 0,
        },
      },
    },
  };

  expect(results).toEqual([expected]);
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith(ourGetNode);
});

it('should be able to run timed tests repeatedly and give a summary of the timings', () => {
  expect(true).toBe(false);
});
