import { TimedTask, StaticTask, TaskGroup } from './../types';

let count: number = 0;

export function getUniqueId(): string {
  return `unique-id:${count++}`;
}

export function timedTask(args: Omit<TimedTask, 'taskId' | 'type'>): TimedTask {
  return {
    taskId: getUniqueId(),
    type: 'timed',
    ...args,
  };
}

export function staticTask(
  args: Omit<StaticTask, 'taskId' | 'type'>,
): StaticTask {
  return {
    taskId: getUniqueId(),
    type: 'static',
    ...args,
  };
}

export function taskGroup(args: Omit<TaskGroup, 'groupId'>): TaskGroup {
  return {
    groupId: getUniqueId(),
    ...args,
  };
}
