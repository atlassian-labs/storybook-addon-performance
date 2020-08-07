import React from 'react';
import invariant from 'tiny-invariant';
import { Nullable, Result, StaticResult, Task, TimedResult } from '../../types';
import ErrorResultView from './error-result';
import StaticResultView from './static-result';
import TimedResultView from './timed-result';

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
    return <ErrorResultView key={task.name} task={task} result={result} />;
  }

  if (result.type === 'static') {
    invariant(task.type === 'static', `Unexpected task type: ${task.type}`);
    // Sometimes a pinned value can be an error. We don't want to compare against that
    const pin: Nullable<StaticResult> = pinned && pinned.type === 'static' ? pinned : null;
    return <StaticResultView key={task.name} task={task} result={result} pinned={pin} />;
  }

  if (result.type === 'timed') {
    invariant(
      task.type === 'timed' || task.type === 'interaction',
      `Unexpected task type: ${task.type}`,
    );
    // Sometimes a pinned value can be an error. We don't want to compare against that
    const pin: Nullable<TimedResult> = pinned && pinned.type === 'timed' ? pinned : null;
    return <TimedResultView key={task.name} task={task} result={result} pinned={pin} />;
  }

  // eslint-disable-next-line no-console
  console.error('Incorrect data passed to TaskResult', { result, task, pinned });
  return null;
}
