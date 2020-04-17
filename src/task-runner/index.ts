import { ErrorResult } from '../types';
import { TimedTask, StaticTask, TimedResult, StaticResult, InteractionTask } from '../types';
import React from 'react';
import { TaskGroup, TaskGroupResult } from '../types';
import toSafeElement from './to-safe-element';
import runGroup from './run-group';
import { getResultForStaticTask } from './run-static-task';
import { getResultForTimedTask } from './run-timed-task';

export type RunAllArgs = {
  groups: TaskGroup[];
  getNode: () => React.ReactNode;
  samples: number;
  copies: number;
};

export async function runAll({
  groups,
  getNode,
  samples,
  copies,
}: RunAllArgs): Promise<TaskGroupResult[]> {
  const value: TaskGroupResult[] = [];

  for (const group of groups) {
    const results: TaskGroupResult = await runGroup({
      group,
      getElement: () => toSafeElement({ getNode, copies }),
      samples,
    });
    value.push(results);
  }

  return value;
}

export type RunOneTimedTaskArgs = {
  task: TimedTask | InteractionTask;
  getNode: () => React.ReactNode;
  copies: number;
  samples: number;
};

export async function runOneTimed({
  task,
  getNode,
  copies,
  samples,
}: RunOneTimedTaskArgs): Promise<TimedResult | ErrorResult> {
  const result = await getResultForTimedTask({
    task,
    getElement: () => toSafeElement({ getNode, copies }),
    samples,
  });

  return result;
}

export type RunOneStaticTaskArgs = {
  task: StaticTask;
  getNode: () => React.ReactNode;
  copies: number;
};

export async function runOneStatic({
  task,
  getNode,
  copies,
}: RunOneStaticTaskArgs): Promise<StaticResult | ErrorResult> {
  return getResultForStaticTask({
    task,
    getElement: () => toSafeElement({ getNode, copies }),
  });
}
