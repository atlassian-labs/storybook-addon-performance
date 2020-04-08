import { runOneTimed } from '../src/task-runner';
import { timedTask } from '../src/tasks/create';
import { RunTimedTaskArgs, TimedResult, TimedTask, TaskGroup } from '../src/types';

it('should run one timed task', async () => {
  const ourGetNode = () => null;
  const mock = jest.fn();

  const task: TimedTask = timedTask({
    name: 'task',
    description: 'task',
    run: ({ getElement }: RunTimedTaskArgs) => Promise.resolve().then(() => mock(getElement())),
  });
  const group: TaskGroup = {
    name: 'Test Group',
    timed: [],
    static: [],
  };

  const samples: number = 3;

  const results: TimedResult = await runOneTimed({
    task,
    group,
    getNode: ourGetNode,
    samples,
    copies: 1,
  });

  const expected: TimedResult = {
    taskName: task.name,
    groupName: group.name,
    averageMs: expect.any(Number) as number,
    samples,
    variance: {
      standardDeviation: expect.any(Number) as number,
      upperPercentage: expect.any(Number) as number,
      lowerPercentage: expect.any(Number) as number,
    },
  };
  expect(results).toEqual(expected);
  expect(mock).toHaveBeenCalledTimes(samples);
});
