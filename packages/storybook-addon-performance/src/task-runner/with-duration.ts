import { TimedControls, Nullable } from '../types';
import invariant from 'tiny-invariant';

async function getDuration(fn: () => Promise<void>): Promise<number> {
  const start: number = performance.now();
  await fn();
  const finish: number = performance.now();
  return finish - start;
}

export default async function withDuration(
  fn: (controls: TimedControls) => Promise<void>,
): Promise<number> {
  let timedDuration: Nullable<number> = null;
  let isControlled: boolean = false;

  const controls: TimedControls = {
    time: async function time(fn: () => Promise<void>): Promise<void> {
      invariant(!isControlled, 'controls.time has already been used');
      isControlled = true;
      timedDuration = await getDuration(fn);
    },
  };

  const wholeTaskDuration: number = await getDuration(() => fn(controls));

  if (isControlled) {
    invariant(
      timedDuration != null,
      `
      You have used controls.timed but have not waited for the result to finish
      Ensure that you wait for the result:

      await controls.time(async () => {});

      You might not be waiting for controls.time

      controls.time(async () => {});
    `,
    );
    return timedDuration;
  }

  return wholeTaskDuration;
}
