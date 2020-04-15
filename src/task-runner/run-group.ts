import React from 'react';
import {
  InteractionTask,
  StaticResult,
  StaticTask,
  Task,
  TaskGroup,
  TaskGroupResult,
  TimedResult,
  TimedTask,
} from '../types';
import toResultMap from '../util/to-result-map';
import { asyncMap } from './async';
import runStaticTask from './run-static-task';
import runTaskRepeatedly from './run-task-repeatedly';

type RunGroupArgs = {
  group: TaskGroup;
  getElement: () => React.ReactElement;
  samples: number;
};

export default async function runGroup({
  group,
  getElement,
  samples,
}: RunGroupArgs): Promise<TaskGroupResult> {
  const staticResults: StaticResult[] = await asyncMap({
    source: group.tasks.filter((task: Task) => task.type === 'static') as StaticTask[],
    map: async function map(task: StaticTask): Promise<StaticResult> {
      const value: string = await runStaticTask({
        task,
        getElement,
      });
      const result: StaticResult = {
        type: 'static',
        taskId: task.taskId,
        value,
      };
      return result;
    },
  });
  const timedResults: TimedResult[] = await asyncMap({
    source: group.tasks.filter((task: Task) => task.type === 'timed') as TimedTask[],
    map: async function map(task: TimedTask): Promise<TimedResult> {
      return runTaskRepeatedly({
        task,
        getElement,
        samples,
      });
    },
  });
  const interactionResults: TimedResult[] = await asyncMap({
    source: group.tasks.filter((task: Task) => task.type === 'interaction') as InteractionTask[],
    map: async function map(task: InteractionTask): Promise<TimedResult> {
      return runTaskRepeatedly({
        task,
        getElement,
        samples,
      });
    },
  });

  const results: TaskGroupResult = {
    groupId: group.groupId,
    map: toResultMap([...timedResults, ...staticResults, ...interactionResults]),
  };

  return results;
}
