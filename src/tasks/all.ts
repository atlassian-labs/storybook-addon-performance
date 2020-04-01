import { TaskGroup, TaskMap, StaticTask, TimedTask } from './../types';
import serverSide from './server-side';
import initialMount from './client';
import interactions from './interactions';

const groups: TaskGroup[] = [serverSide, initialMount, interactions];

const flatten = <T>(lists: T[][]): T[] => {
  return Array.prototype.concat.apply([], lists);
};

const tasks: TaskMap = flatten(groups.map((group) => [...group.static, ...group.timed])).reduce(
  (acc: TaskMap, item: TimedTask | StaticTask) => {
    acc[item.taskId] = item;
    return acc;
  },
  {},
);

export default {
  groups,
  tasks,
};
