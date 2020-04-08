import { TimedTask, StaticTask } from './../types';

export function timedTask(args: Omit<TimedTask, 'type'>): TimedTask {
  return {
    type: 'timed',
    ...args,
  };
}

export function staticTask(args: Omit<StaticTask, 'type'>): StaticTask {
  return {
    type: 'static',
    ...args,
  };
}
