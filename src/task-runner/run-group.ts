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
  ErrorResult,
} from '../types';
import getResultMap from '../util/get-result-map';
import { asyncMap } from './async';
import { getResultForStaticTask } from './run-static-task';
import { getResultForTimedTask } from './run-timed-task';

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
  const staticResults: (StaticResult | ErrorResult)[] = await asyncMap({
    source: group.tasks.filter((task: Task) => task.type === 'static') as StaticTask[],
    map: async function map(task: StaticTask): Promise<StaticResult | ErrorResult> {
      return getResultForStaticTask({
        task,
        getElement,
      });
    },
  });
  const timedResults: (TimedResult | ErrorResult)[] = await asyncMap({
    source: group.tasks.filter((task: Task) => task.type === 'timed') as TimedTask[],
    map: async function map(task: TimedTask): Promise<TimedResult | ErrorResult> {
      return getResultForTimedTask({
        task,
        getElement,
        samples,
      });
    },
  });
  const interactionResults: (TimedResult | ErrorResult)[] = await asyncMap({
    source: group.tasks.filter((task: Task) => task.type === 'interaction') as InteractionTask[],
    map: async function map(task: InteractionTask): Promise<TimedResult | ErrorResult> {
      return getResultForTimedTask({
        task,
        getElement,
        samples,
      });
    },
  });

  const results: TaskGroupResult = {
    groupId: group.groupId,
    map: getResultMap([...timedResults, ...staticResults, ...interactionResults]),
  };

  return results;
}
