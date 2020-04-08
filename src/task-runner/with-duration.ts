import { TimedControls, Nullable } from '../types';

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

  const controls: TimedControls = {
    time: async function time(fn: () => Promise<void>): Promise<void> {
      timedDuration = await getDuration(fn);
    },
  };

  const wholeTaskDuration: number = await getDuration(() => fn(controls));

  return timedDuration != null ? timedDuration : wholeTaskDuration;
}
