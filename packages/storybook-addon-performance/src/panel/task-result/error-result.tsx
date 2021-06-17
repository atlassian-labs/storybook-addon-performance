import React from 'react';
import { ErrorResult, Task } from '../../types';
import { ExpandingResult } from './expanding-result';
import * as Parts from './parts';

function ErrorSection({ result }: { result: ErrorResult }) {
  const message: React.ReactNode = result.message ? (
    <Parts.Content>Message: {result.message}</Parts.Content>
  ) : null;

  if (result.reason === 'unhandled') {
    return (
      <>
        <Parts.Heading>Error ❌</Parts.Heading>
        <Parts.Content>An unhandled error has occurred while running this task</Parts.Content>
        {message}
      </>
    );
  }
  return (
    <>
      <Parts.Heading>Unsupported ⚠️</Parts.Heading>
      <Parts.Content>This task is not supported in the current running environment</Parts.Content>
      {message}
    </>
  );
}
function Expanded({ task, result }: { task: Task; result: ErrorResult }) {
  return (
    <>
      <ErrorSection result={result} />
      <Parts.Heading>Description</Parts.Heading>
      <Parts.Content>{task.description}</Parts.Content>
    </>
  );
}

export default function ErrorResultView({ task, result }: { task: Task; result: ErrorResult }) {
  const resultNode =
    result.reason === 'unsupported' ? (
      <Parts.ValueLozenge type="warning">Unsupported</Parts.ValueLozenge>
    ) : (
      <Parts.ValueLozenge type="negative">Error</Parts.ValueLozenge>
    );

  return (
    <ExpandingResult
      name={task.name}
      result={resultNode}
      getExpanded={({ isExpanded }) =>
        isExpanded ? <Expanded task={task} result={result} /> : null
      }
    />
  );
}
