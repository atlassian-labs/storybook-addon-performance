import React from 'react';
import { TimedTask, RunTimedTaskArgs, RunStaticTaskArgs } from '../../src/types';
import runTimedTask from '../../src/task-runner/run-timed-task';

async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function didThrow(fn: () => Promise<any>): Promise<boolean> {
  // best of bad options
  // https://github.com/facebook/jest/issues/1700
  let result: boolean = false;
  try {
    await fn();
  } catch (e) {
    result = true;
  }
  return result;
}

async function willTimedTaskThrow(task: TimedTask): Promise<boolean> {
  return await didThrow(() =>
    runTimedTask({
      task,
      getElement: () => <div>Hello world</div>,
    }),
  );
}

function getTask({ run }: { run: TimedTask['run'] }): TimedTask {
  return {
    type: 'timed',
    name: 'task',
    description: '',
    taskId: 'task',
    run,
  };
}

it('should only time the portion of the task that is timed', async () => {
  {
    const task: TimedTask = getTask({
      run: async (): Promise<void> => {
        await wait(200);
      },
    });
    const duration: number = await runTimedTask({
      task,
      getElement: () => <div>Hello world</div>,
    });
    expect(duration).toBeGreaterThanOrEqual(200);
  }
  {
    const task: TimedTask = getTask({
      run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
        await wait(200);
        await controls.time(async () => {});
        await wait(200);
      },
    });
    const duration: number = await runTimedTask({
      task: task,
      getElement: () => <div>Hello world</div>,
    });
    // this would not be possible if either of the waits contributed to the time
    expect(duration).toBeLessThan(200);
  }
}, /* timeout */ 60000);

it('should throw if trying to use control.time twice', async () => {
  const task: TimedTask = getTask({
    run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
      await controls.time(async () => {});
      await controls.time(async () => {});
    },
  });

  const thrown: boolean = await willTimedTaskThrow(task);
  expect(thrown).toBe(true);
});

it('should throw if not waiting for control.time to finish', async () => {
  const task: TimedTask = getTask({
    run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
      // not waiting for controls.time
      controls.time(() => wait(200));
    },
  });

  const thrown: boolean = await willTimedTaskThrow(task);
  expect(thrown).toBe(true);

  // validation
  {
    const task: TimedTask = getTask({
      run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
        return controls.time(() => wait(200));
      },
    });

    const thrown: boolean = await willTimedTaskThrow(task);
    expect(thrown).toBe(false);
  }
  // validation
  {
    const task: TimedTask = getTask({
      run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
        await controls.time(() => wait(200));
      },
    });

    const thrown: boolean = await willTimedTaskThrow(task);
    expect(thrown).toBe(false);
  }
});
