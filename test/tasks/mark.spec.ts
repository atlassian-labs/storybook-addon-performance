import { UnsupportedError } from '../../src/task-runner/custom-errors';
import { runOneStatic, runOneTimed } from '../../src/task-runner';
import { ErrorResult, StaticResult, StaticTask, TimedTask, TimedResult } from '../../src/types';

beforeEach(() => {
  performance.mark = jest.fn();
  performance.measure = jest.fn();
});

it('should wrap a task in a performance.mark', async () => {
  const task: StaticTask = {
    type: 'static',
    description: 'task',
    name: 'task',
    run: async () => {
      return 'hey';
    },
  };
  expect(performance.mark).not.toHaveBeenCalled();
  expect(performance.measure).not.toHaveBeenCalled();

  const results: StaticResult | ErrorResult = await runOneStatic({
    task,
    getNode: () => null,
    copies: 1,
  });
  expect(results.type).toEqual('static');
  expect(performance.mark).toHaveBeenCalledTimes(2);
  expect(performance.measure).toHaveBeenCalledTimes(1);
});

it('should still use performance.mark even when there is an error in the task', async () => {
  const task: StaticTask = {
    type: 'static',
    description: 'task',
    name: 'task',
    run: async () => {
      throw new Error('boom');
    },
  };
  expect(performance.mark).not.toHaveBeenCalled();
  expect(performance.measure).not.toHaveBeenCalled();

  const results: StaticResult | ErrorResult = await runOneStatic({
    task,
    getNode: () => null,
    copies: 1,
  });
  expect(results.type).toEqual('error');
  expect(performance.mark).toHaveBeenCalledTimes(2);
  expect(performance.measure).toHaveBeenCalledTimes(1);
});
