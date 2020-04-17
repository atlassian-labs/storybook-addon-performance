import React from 'react';
import { Task, Nullable, Result } from '../../types';
import ErrorResultView from './error-result';
import TimedResultView from './timed-result';
import StaticResultView from './static-result';

type ResultProps = {
  task: Task;
  result: Nullable<Result>;
  pinned: Nullable<Result>;
};

export default function TaskResult({ task, result, pinned }: ResultProps) {
  // This can happen when jumping between stories briefly before any storybook events fire
  // https://github.com/storybookjs/storybook/issues/10352
  if (result == null) {
    return null;
  }

  if (result.type === 'error') {
    return <ErrorResultView key={task.taskId} task={task} result={result} />;
  }

  if (
    result.type === 'static' &&
    task.type === 'static' &&
    (!pinned || pinned?.type === 'static')
  ) {
    return <StaticResultView key={task.taskId} task={task} result={result} pinned={pinned} />;
  }

  if (
    result.type === 'timed' &&
    (task.type === 'timed' || task.type === 'interaction') &&
    (!pinned || pinned?.type === 'timed')
  ) {
    return <TimedResultView key={task.taskId} task={task} result={result} pinned={pinned} />;
  }

  console.error('Incorrect data passed to TaskResult', { result, task, pinned });
  return null;
}
