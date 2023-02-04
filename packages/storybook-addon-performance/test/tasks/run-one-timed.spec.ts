import { runOneTimed } from '../../src/task-runner';
import { RunTimedTaskArgs, TimedResult, TimedTask, ErrorResult } from '../../src/types';

it('should run one timed task', async () => {
  const ourGetNode = () => null;
  const mock = jest.fn();

  const task: TimedTask = {
    name: 'task',
    type: 'timed',
    description: 'task',
    run: ({ getElement }: RunTimedTaskArgs) => Promise.resolve().then(() => mock(getElement())),
  };
  const samples: number = 3;

  const results: TimedResult | ErrorResult = await runOneTimed({
    task,
    getNode: ourGetNode,
    samples,
    copies: 1,
  });

  const expected: TimedResult = {
    taskName: task.name,
    type: 'timed',
    averageMs: expect.any(Number),
    samples,
    variance: {
      standardDeviation: expect.any(Number),
      upperPercentage: expect.any(Number),
      lowerPercentage: expect.any(Number),
    },
  };
  expect(results).toEqual(expected);
  expect(mock).toHaveBeenCalledTimes(samples);
});
