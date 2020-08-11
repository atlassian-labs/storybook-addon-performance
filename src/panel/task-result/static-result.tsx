import React from 'react';
import { StaticResult, StaticTask, Nullable } from '../../types';
import * as Parts from './parts';
import { ExpandingResult } from './expanding-result';

function DiffToPinned({
  task,
  result,
  pinned,
}: {
  task: StaticTask;
  result: StaticResult;
  pinned: Nullable<StaticResult>;
}) {
  if (pinned == null) {
    return null;
  }

  return (
    <>
      <Parts.Heading>Compared with pinned</Parts.Heading>
      <Parts.Content>
        <Parts.Table>
          <tbody>
            <tr>
              <Parts.TitleCell>Pinned value</Parts.TitleCell>
              <Parts.ValueCell>
                <Parts.ValueLozenge type="raw">
                  {pinned.value}
                  {task.scale}
                </Parts.ValueLozenge>
              </Parts.ValueCell>
            </tr>
            <tr>
              <Parts.TitleCell>Current value</Parts.TitleCell>
              <Parts.ValueCell>
                <Parts.ValueLozenge type={pinned.value === result.value ? 'raw' : 'info'}>
                  {result.value}
                  {task.scale}
                </Parts.ValueLozenge>
              </Parts.ValueCell>
            </tr>
          </tbody>
        </Parts.Table>
      </Parts.Content>
    </>
  );
}

function Expanded({
  task,
  result,
  pinned,
}: {
  task: StaticTask;
  result: StaticResult;
  pinned: Nullable<StaticResult>;
}) {
  return (
    <>
      <DiffToPinned task={task} result={result} pinned={pinned} />
      <Parts.Heading>Description</Parts.Heading>
      <Parts.Content>{task.description}</Parts.Content>
    </>
  );
}

export default function StaticResultView({
  task,
  result,
  pinned,
}: {
  task: StaticTask;
  result: StaticResult;
  pinned: Nullable<StaticResult>;
}) {
  const resultNode = (
    <>
      {pinned && pinned.value !== result.value ? (
        <Parts.ValueLozenge type="info">
          {pinned.value}
          {task.scale}
        </Parts.ValueLozenge>
      ) : null}
      <Parts.ResultValue>{result.value}</Parts.ResultValue>{' '}
      <Parts.ResultScale>{task.scale}</Parts.ResultScale>
    </>
  );

  return (
    <ExpandingResult
      name={task.name}
      result={resultNode}
      getExpanded={({ isExpanded }) =>
        isExpanded ? <Expanded task={task} result={result} pinned={pinned} /> : null
      }
    />
  );
}
