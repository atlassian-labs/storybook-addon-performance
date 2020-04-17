import React from 'react';
import { ErrorResult, Task } from '../../types';
import { ExpandingResult } from './expanding-result';
import * as Parts from './parts';

function Expanded({ task, result }: { task: Task; result: ErrorResult }) {
  return (
    <>
      <Parts.Heading>Description</Parts.Heading>
      <Parts.Content>{task.description}</Parts.Content>
    </>
  );
}

export default function ErrorResultView({ task, result }: { task: Task; result: ErrorResult }) {
  const resultNode = (
    <>
      <Parts.ValueLozenge type="negative">Error</Parts.ValueLozenge>
    </>
  );

  return (
    <ExpandingResult
      taskId={task.taskId}
      name={task.name}
      result={resultNode}
      getExpanded={({ isExpanded }) =>
        isExpanded ? <Expanded task={task} result={result} /> : null
      }
    />
  );
}
