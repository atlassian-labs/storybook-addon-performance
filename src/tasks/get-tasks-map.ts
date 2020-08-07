import { Task, TaskGroup, TaskMap } from '../types';
import { flatten } from 'xstate/lib/utils';

export default function getTaskMap(groups: TaskGroup[]): TaskMap {
  return flatten(groups.map((group) => group.tasks)).reduce((acc: TaskMap, task: Task) => {
    acc[task.name] = task;
    return acc;
  }, {});
}
