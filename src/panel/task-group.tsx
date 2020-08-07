import { styled } from '@storybook/theming';
import React from 'react';
import { interactionGroupId } from '../tasks/get-interaction-group';
import { Link } from '@storybook/components';
import { Nullable, Task, TaskGroup, TaskGroupResult } from '../types';
import TaskResult from './task-result';

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: var(--grid);
`;

const Container = styled.div`
  padding: var(--halfGrid);
`;

type Props = {
  group: TaskGroup;
  result: Nullable<TaskGroupResult>;
  pinned: Nullable<TaskGroupResult>;
};

function EmptyGroupMessage({ group }: { group: TaskGroup }) {
  if (group.groupId === interactionGroupId && !group.tasks.length) {
    return (
      <small>
        No{' '}
        <Link
          href="https://github.com/atlassian-labs/storybook-addon-performance#usage-interactions"
          target="_blank"
          rel="noopener"
        >
          interactions
        </Link>{' '}
        defined.
      </small>
    );
  }
  return null;
}

export default React.memo(function TaskGroup({ group, result, pinned }: Props) {
  if (!result) {
    return null;
  }

  return (
    <Container>
      <Title>{group.name}</Title>
      <EmptyGroupMessage group={group} />
      {group.tasks.map((task: Task) => {
        return (
          <TaskResult
            key={task.name}
            task={task}
            result={result.map[task.name] || null}
            pinned={pinned?.map[task.name] || null}
          />
        );
      })}
    </Container>
  );
});
