import React from 'react';
import { runOneTimed, RunOneTimedTaskArgs } from '../../src/task-runner';
import { RunTimedTaskArgs, TimedTask, TimedResult, ErrorResult } from '../../src/types';

async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

function getArgs({ run }: { run: TimedTask['run'] }): RunOneTimedTaskArgs {
  const task: TimedTask = {
    type: 'timed',
    name: 'task',
    description: '',
    run,
  };

  return {
    task,
    getNode: () => <div>Hello world</div>,
    copies: 1,
    samples: 1,
  };
}

it('should only time the portion of the task that is timed', async () => {
  {
    const result: TimedResult | ErrorResult = await runOneTimed(
      getArgs({
        run: async (): Promise<void> => {
          await wait(200);
        },
      }),
    );
    // not waiting the full 200 as sometimes the engine can come in a little early
    expect((result as TimedResult).averageMs).toBeGreaterThanOrEqual(180);
  }
  {
    const result: TimedResult | ErrorResult = await runOneTimed(
      getArgs({
        run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
          await wait(200);
          await controls.time(async () => {});
          await wait(200);
        },
      }),
    );
    // this would not be possible if either of the waits contributed to the time
    expect((result as TimedResult).averageMs).toBeLessThan(200);
  }
}, /* timeout */ 60000);

it('should throw if trying to use control.time twice', async () => {
  const result: TimedResult | ErrorResult = await runOneTimed(
    getArgs({
      run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
        await controls.time(async () => {});
        await controls.time(async () => {});
      },
    }),
  );

  expect(result.type).toBe('error');
});

it('should throw if not waiting for control.time to finish', async () => {
  {
    const result: TimedResult | ErrorResult = await runOneTimed(
      getArgs({
        run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
          // not waiting for controls.time
          controls.time(() => wait(200));
        },
      }),
    );

    expect(result.type).toBe('error');
  }

  // validation
  {
    const result: TimedResult | ErrorResult = await runOneTimed(
      getArgs({
        run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
          return controls.time(() => wait(200));
        },
      }),
    );

    expect(result.type).toBe('timed');
  }
  // validation
  {
    const result: TimedResult | ErrorResult = await runOneTimed(
      getArgs({
        run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
          await controls.time(() => wait(200));
        },
      }),
    );

    expect(result.type).toBe('timed');
  }
});
