import { TimedTask, StaticTask, TimedResult, StaticResult } from '../types';
import React from 'react';
import { TaskGroup, TaskGroupResult } from '../types';
import repeatElement from './repeat-element';
import runGroup from './run-group';
import runStaticTask from './run-static-task';
import runTimedTaskRepeatedly from './run-timed-task-repeatedly';

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
      getElement: () => repeatElement(getNode, copies),
      samples,
    });
    value.push(results);
  }

  return value;
}

type RunOneTimedTaskArgs = {
  task: TimedTask;
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
  const result = await runTimedTaskRepeatedly({
    task,
    getElement: () => repeatElement(getNode, copies),
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
    getElement: () => repeatElement(getNode, copies),
  });

  const result: StaticResult = {
    taskId: task.taskId,
    value: output,
  };
  return result;
}
