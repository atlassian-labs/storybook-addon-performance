import React from 'react';
import { TimedTask, RunTimedTaskArgs } from '../../src/types';
import runTimedTask from '../../src/task-runner/run-timed-task';

async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

it('should only time the portion of the test that is timed', async () => {
  {
    const uncontrolled: TimedTask = {
      type: 'timed',
      name: 'uncontrolled',
      description: '',
      taskId: 'uncontrolled',
      run: async (): Promise<void> => {
        await wait(200);
      },
    };
    const duration: number = await runTimedTask({
      task: uncontrolled,
      getElement: () => <div>Hello world</div>,
    });
    expect(duration).toBeGreaterThanOrEqual(200);
  }
  {
    const controlled: TimedTask = {
      type: 'timed',
      name: 'controlled',
      description: '',
      taskId: 'controlled',
      run: async ({ controls }: RunTimedTaskArgs): Promise<void> => {
        await wait(200);
        await controls.time(async () => {});
        await wait(200);
      },
    };
    const duration: number = await runTimedTask({
      task: controlled,
      getElement: () => <div>Hello world</div>,
    });
    // this would not be possible if either of the waits contributed to the time
    expect(duration).toBeLessThan(200);
  }
}, /* timeout */ 60000);
