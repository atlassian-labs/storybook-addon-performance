import { styled } from '@storybook/theming';
import React, { ReactNode } from 'react';
import {
  StaticTask,
  TaskGroup,
  TaskGroupResult,
  TimedTask,
  Nullable,
  Task,
  ResultMap,
  StaticResult,
  TimedResult,
} from '../types';
import Timed from './task-result/timed-result';
import Static from './task-result/static-result';
import { interactionGroupId } from '../tasks/get-interaction-group';

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: var(--grid);
`;

const Container = styled.div`
  padding: var(--halfGrid);
`;

type Props = {
  group: TaskGroup;
  result: TaskGroupResult;
  pinned: Nullable<TaskGroupResult>;
};

function EmptyGroupMessage({ group }: { group: TaskGroup }) {
  if (group.groupId === interactionGroupId && !group.tasks.length) {
    return (
      <small>
        No{' '}
        <a
          href="https://github.com/atlassian-labs/storybook-addon-performance#usage-interactions"
          target="_blank"
          rel="noopener"
        >
          interactions
        </a>{' '}
        defined.
      </small>
    );
  }
  return null;
}

export default React.memo(function TaskGroup({ group, result, pinned }: Props) {
  return (
    <Container>
      <Title>{group.displayName}</Title>
      <EmptyGroupMessage group={group} />
      {group.tasks.map((task: Task) => {
        const value: StaticResult | TimedResult | undefined = result.map[task.taskId];

        // This can happen when jumping between stories briefly before any storybook events fire
        // https://github.com/storybookjs/storybook/issues/10352
        if (value == null) {
          return null;
        }

        if (task.type === 'timed') {
          return (
            <Timed
              key={task.taskId}
              task={task}
              result={value as TimedResult}
              pinned={pinned ? (pinned.map[task.taskId] as TimedResult) : null}
            />
          );
        }

        if (task.type === 'static') {
          return (
            <Static
              key={task.taskId}
              task={task}
              result={value as StaticResult}
              pinned={pinned ? (pinned.map[task.taskId] as StaticResult) : null}
            />
          );
        }
        return (
          <Timed
            key={task.taskId}
            task={task}
            result={value as TimedResult}
            pinned={pinned ? (pinned.map[task.taskId] as TimedResult) : null}
          />
        );
      })}
    </Container>
  );
});
