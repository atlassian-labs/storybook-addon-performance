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

export default React.memo(function TaskGroup({ group, result, pinned }: Props) {
  return (
    <Container>
      <Title>{group.uniqueName}</Title>
      {group.tasks.map((task: Task) => {
        if (task.type === 'timed') {
          return (
            <Timed
              key={task.taskId}
              task={task}
              result={result.map[task.taskId] as TimedResult}
              pinned={pinned ? (pinned.map[task.taskId] as TimedResult) : null}
            />
          );
        }

        if (task.type === 'static') {
          return (
            <Static
              key={task.taskId}
              task={task}
              result={result.map[task.taskId] as StaticResult}
              pinned={pinned ? (pinned.map[task.taskId] as StaticResult) : null}
            />
          );
        }

        // interaction
        // TODO
        return (
          <Timed
            key={task.taskId}
            task={task as any}
            result={result.map[task.taskId] as TimedResult}
            pinned={pinned ? (pinned.map[task.taskId] as TimedResult) : null}
          />
        );
      })}
    </Container>
  );
});
