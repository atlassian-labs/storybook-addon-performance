import { TaskGroup, TaskMap, TimedTask, StaticTask, Task } from '../types';

function flatten<T>(lists: T[][]): T[] {
  return Array.prototype.concat.apply([], lists);
}

export default function getTaskMap(groups: TaskGroup[]): TaskMap {
  return flatten(groups.map((group) => [...group.static, ...group.timed])).reduce(
    (acc: TaskMap, item: Task) => {
      acc[item.taskId] = item;
      return acc;
    },
    {},
  );
}
