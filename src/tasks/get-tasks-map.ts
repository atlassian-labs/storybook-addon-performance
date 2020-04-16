import { Task, TaskGroup, TaskMap } from '../types';
import { flatten } from 'xstate/lib/utils';

export default function getTaskMap(groups: TaskGroup[]): TaskMap {
  return flatten(groups.map((group) => group.tasks)).reduce((acc: TaskMap, item: Task) => {
    acc[item.taskId] = item;
    return acc;
  }, {});
}
