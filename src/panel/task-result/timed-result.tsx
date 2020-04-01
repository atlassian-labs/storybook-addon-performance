import React from 'react';
import { Nullable, TimedResult, TimedTask } from '../../types';
import toFixed from '../../util/to-fixed';
import { ExpandingResult } from './expanding-result';
import * as Parts from './parts';

const warningIcon = <span>⚠️</span>;

function DiffToPinned({
  result,
  pinned,
}: {
  result: TimedResult;
  pinned: Nullable<TimedResult>;
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
                  {toFixed(pinned.averageMs, 1)}ms
                </Parts.ValueLozenge>
              </Parts.ValueCell>
            </tr>
            <tr>
              <Parts.TitleCell>Current value</Parts.TitleCell>
              <Parts.ValueCell>
                <Parts.ValueLozenge type="raw">
                  {toFixed(result.averageMs, 1)}ms
                </Parts.ValueLozenge>
              </Parts.ValueCell>
            </tr>
            <tr>
              <Parts.TitleCell>Difference</Parts.TitleCell>
              <Parts.ValueCell>
                <DiffLozenge diff={getDiff({ result, pinned })} />
              </Parts.ValueCell>
            </tr>
          </tbody>
        </Parts.Table>
      </Parts.Content>
    </>
  );
}

function Variance({ result }: { result: TimedResult }) {
  if (result.samples === 1) {
    return null;
  }

  const wasStable: boolean = result.variance.standardDeviation < 1;

  return (
    <>
      <Parts.Heading>Variance</Parts.Heading>
      <Parts.Note>
        When doing multiple runs the can be differences between the runs. The
        lower the variance, the higher confidence you can have
      </Parts.Note>
      <Parts.Table>
        <tbody>
          <tr>
            <Parts.TitleCell>Samples</Parts.TitleCell>
            <Parts.ValueCell>
              <Parts.ValueLozenge type="info">
                {result.samples}
              </Parts.ValueLozenge>
            </Parts.ValueCell>
          </tr>
          <tr>
            <Parts.TitleCell>Standard deviation</Parts.TitleCell>
            <Parts.ValueCell>
              <Parts.ValueLozenge type={wasStable ? 'positive' : 'negative'}>
                {wasStable ? null : warningIcon}
                {toFixed(result.variance.standardDeviation)}
              </Parts.ValueLozenge>
            </Parts.ValueCell>
          </tr>
          <tr>
            <Parts.TitleCell>Lowest</Parts.TitleCell>
            <Parts.ValueCell>
              <Parts.ValueLozenge type="raw">
                -{toFixed(result.variance.lowerPercentage)}%
              </Parts.ValueLozenge>
            </Parts.ValueCell>
          </tr>
          <tr>
            <Parts.TitleCell>Highest</Parts.TitleCell>
            <Parts.ValueCell>
              <Parts.ValueLozenge type="raw">
                +{toFixed(result.variance.upperPercentage)}%
              </Parts.ValueLozenge>
            </Parts.ValueCell>
          </tr>
        </tbody>
      </Parts.Table>
    </>
  );
}

function Expanded({
  task,
  result,
  pinned,
}: {
  task: TimedTask;
  result: TimedResult;
  pinned: Nullable<TimedResult>;
}) {
  return (
    <>
      <DiffToPinned result={result} pinned={pinned} />
      <Variance result={result} />
      <Parts.Heading>Description</Parts.Heading>
      <Parts.Content>{task.description}</Parts.Content>
    </>
  );
}

type TimedProps = {
  task: TimedTask;
  result: TimedResult;
  pinned: Nullable<TimedResult>;
};

function getDiff({
  result,
  pinned,
}: {
  result: TimedResult;
  pinned: Nullable<TimedResult>;
}) {
  if (!pinned) {
    return 0;
  }

  return toFixed(1 - pinned.averageMs / result.averageMs);
}

function DiffLozenge({ diff }: { diff: number }) {
  const type = (() => {
    if (diff > 1) {
      return 'negative';
    }
    if (diff < -1) {
      return 'positive';
    }
    return 'faint';
  })();

  return <Parts.ValueLozenge type={type}>{diff}%</Parts.ValueLozenge>;
}

export default function Timed({ task, pinned, result }: TimedProps) {
  const diff: number = getDiff({ result, pinned });
  const resultNode = (
    <>
      {diff ? <DiffLozenge diff={diff} /> : null}
      <Parts.ResultValue>{toFixed(result.averageMs)}</Parts.ResultValue>{' '}
      <Parts.ResultScale>ms</Parts.ResultScale>
    </>
  );

  return (
    <ExpandingResult
      taskId={task.taskId}
      name={task.name}
      result={resultNode}
      getExpanded={({ isExpanded }) =>
        isExpanded ? (
          <Expanded task={task} result={result} pinned={pinned} />
        ) : null
      }
    />
  );
}
