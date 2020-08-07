import { runOneTimed, RunOneTimedTaskArgs } from '../../src/task-runner';
import { ErrorResult, TimedResult, TimedTask } from '../../src/types';

it('should not repeat a timed task if an error occurred in one', async () => {
  const mock = jest.fn();
  const task: TimedTask = {
    type: 'timed',
    name: 'task',
    description: '',
    run: async (): Promise<void> => {
      mock();
      throw new Error('boom');
    },
  };

  const result: TimedResult | ErrorResult = await runOneTimed({
    task,
    getNode: () => 'hi',
    samples: 10,
    copies: 1,
  });

  expect(result.type).toBe('error');
  // after the first throw we should not continue to run the task
  expect(mock).toHaveBeenCalledTimes(1);
});
