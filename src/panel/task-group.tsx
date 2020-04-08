import { styled } from '@storybook/theming';
import React from 'react';
import {
  StaticTask,
  TaskGroup,
  TaskGroupResult,
  TimedTask,
  Nullable,
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
      <Title>{group.name}</Title>
      {group.timed.map((task: TimedTask) => {
        return (
          <Timed
            key={task.name}
            task={task}
            group={group}
            result={result.timed[task.name]}
            pinned={pinned ? pinned.timed[task.name] : null}
          />
        );
      })}
      {group.static.map((task: StaticTask) => {
        return (
          <Static
            key={task.name}
            task={task}
            group={group}
            result={result.static[task.name]}
            pinned={pinned ? pinned.static[task.name] : null}
          />
        );
      })}
    </Container>
  );
});
