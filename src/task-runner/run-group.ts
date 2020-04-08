import React from 'react';
import {
  StaticResult,
  StaticTask,
  TaskGroup,
  TaskGroupResult,
  TimedResult,
  TimedTask,
} from '../types';
import { asyncMap } from './async';
import runStaticTask from './run-static-task';
import runTimedTaskRepeatedly from './run-timed-task-repeatedly';
import toResultMap from '../util/to-result-map';

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
  const timedResults: TimedResult[] = await asyncMap({
    source: group.timed,
    map: async function map(task: TimedTask): Promise<TimedResult> {
      return await runTimedTaskRepeatedly({
        task,
        group,
        getElement,
        samples,
      });
    },
  });

  const staticResults: StaticResult[] = await asyncMap({
    source: group.static,
    map: async function map(task: StaticTask): Promise<StaticResult> {
      const value: string = await runStaticTask({
        task,
        getElement,
      });
      const result: StaticResult = {
        taskName: task.name,
        groupName: group.name,
        value,
      };
      return result;
    },
  });

  const results: TaskGroupResult = {
    groupName: group.name,
    timed: toResultMap(timedResults),
    static: toResultMap(staticResults),
  };

  return results;
}
