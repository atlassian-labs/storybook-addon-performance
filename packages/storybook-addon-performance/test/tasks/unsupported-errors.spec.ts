import { UnsupportedError } from '../../src/task-runner/custom-errors';
import { runOneStatic, runOneTimed } from '../../src/task-runner';
import { ErrorResult, StaticResult, StaticTask, TimedTask, TimedResult } from '../../src/types';

it('should list the error as unsupported in an UnsupportedError is thrown (static task)', async () => {
  const message: string = 'My custom unsupported error message';
  const task: StaticTask = {
    type: 'static',
    description: 'task',
    name: 'task',
    run: async () => {
      throw new UnsupportedError(message);
    },
  };

  const results: StaticResult | ErrorResult = await runOneStatic({
    task,
    getNode: () => null,
    copies: 1,
  });

  const expected: ErrorResult = {
    type: 'error',
    taskName: task.name,
    reason: 'unsupported',
    message,
  };

  expect(results).toEqual(expected);
});

it('should list the error as unsupported in an UnsupportedError is thrown (timed task)', async () => {
  const message: string = 'My custom unsupported error message';
  const task: TimedTask = {
    type: 'timed',
    description: 'task',
    name: 'task',
    run: async () => {
      throw new UnsupportedError(message);
    },
  };

  const result: TimedResult | ErrorResult = await runOneTimed({
    task,
    getNode: () => null,
    samples: 1,
    copies: 1,
  });

  const expected: ErrorResult = {
    type: 'error',
    taskName: task.name,
    reason: 'unsupported',
    message,
  };

  expect(result).toEqual(expected);
});
