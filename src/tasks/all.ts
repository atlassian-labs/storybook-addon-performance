import { TaskGroup, TaskMap, StaticTask, TimedTask } from './../types';
import serverSide from './server-side';
import initialMount from './client';
import group from './server-side';

const groups: TaskGroup[] = [serverSide, initialMount];

const flatten = <T>(lists: T[][]): T[] => {
  return Array.prototype.concat.apply([], lists);
};

const makeTasks = (groups: TaskGroup[]) => {
  return flatten(groups.map((group) => [...group.static, ...group.timed])).reduce(
    (acc: TaskMap, item: TimedTask | StaticTask) => {
      acc[item.taskId] = item;
      return acc;
    },
    {},
  );
};

const tasks: TaskMap = makeTasks(groups);

export function getAll(interactionGroup?: TaskGroup) {
  const updatedGroups = interactionGroup ? groups.concat(interactionGroup) : groups;

  const newTasks = makeTasks(updatedGroups);
  return {
    groups: updatedGroups,
    tasks: newTasks,
  };
}

export default {
  groups,
  tasks,
};
