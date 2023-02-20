import { Task, TaskGroup, TaskMap } from '../types';

export default function getTaskMap(groups: TaskGroup[]): TaskMap {
  return groups
    .flatMap((group) => group.tasks)
    .reduce((acc: TaskMap, task: Task) => {
      acc[task.name] = task;
      return acc;
    }, {});
}
