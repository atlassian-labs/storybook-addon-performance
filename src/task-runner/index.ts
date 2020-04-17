import { TimedTask, StaticTask, TimedResult, StaticResult, InteractionTask } from '../types';
import React from 'react';
import { TaskGroup, TaskGroupResult } from '../types';
import toSafeElement from './to-safe-element';
import runGroup from './run-group';
import runStaticTask from './run-static-task';
import runTaskRepeatedly from './run-task-repeatedly';

type RunAllArgs = {
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

type RunOneTimedTaskArgs = {
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
}: RunOneTimedTaskArgs): Promise<TimedResult> {
  const result = await runTaskRepeatedly({
    task,
    getElement: () => toSafeElement({ getNode, copies }),
    samples,
  });

  return result;
}

type RunOneStaticTaskArgs = {
  task: StaticTask;
  getNode: () => React.ReactNode;
  copies: number;
};

export async function runOneStatic({
  task,
  getNode,
  copies,
}: RunOneStaticTaskArgs): Promise<StaticResult> {
  const output: string = await runStaticTask({
    task,
    getElement: () => toSafeElement({ getNode, copies }),
  });

  const result: StaticResult = {
    type: 'static',
    taskId: task.taskId,
    value: output,
  };
  return result;
}
