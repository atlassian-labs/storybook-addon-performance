import { StaticTask, TimedTask } from '../../types';

let count: number = 0;

function getUniqueId(): string {
  return `preset::unique-id:${count++}`;
}

export function timedTask(args: Omit<TimedTask, 'taskId' | 'type'>): TimedTask {
  return {
    taskId: getUniqueId(),
    type: 'timed',
    ...args,
  };
}

export function staticTask(args: Omit<StaticTask, 'taskId' | 'type'>): StaticTask {
  return {
    taskId: getUniqueId(),
    type: 'static',
    ...args,
  };
}
