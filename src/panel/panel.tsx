import { styled } from '@storybook/theming';
import React, { useMemo } from 'react';
import allGroups from '../tasks/all';
import { Channel } from '@storybook/channels';
import { Nullable, TimedTask, TaskGroup, TaskGroupResult } from '../types';
import machine, { RunContext } from './machine';
import ServiceContext from './service-context';
import TaskGroupPanel from './task-group';
import Topbar from './top-bar';
import usePanelMachine from './use-panel-machine';
import { useParameter } from '@storybook/api';
import { paramKey } from '../addon-constants';
import { getInterationGroup } from '../tasks/interactions';

const Container = styled.div`
  --grid: 10px;
  --halfGrid: calc(var(--grid) / 2);

  font-size: 16px;
  line-height: 1.5;
`;

const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  min-height: 100%;
  padding: 0 var(--halfGrid);
`;

function findResult(group: TaskGroup, context: Nullable<RunContext>): Nullable<TaskGroupResult> {
  if (!context || !context.results) {
    return null;
  }

  const result: TaskGroupResult | undefined = context.results.find(
    (item: TaskGroupResult) => item.groupName === group.name,
  );

  return result || null;
}

function getResult(group: TaskGroup, context: RunContext): TaskGroupResult {
  const result: Nullable<TaskGroupResult> = findResult(group, context);
  // Cannot use invariant as we are not at a high enough typescript version
  if (!result) {
    throw new Error(`Could not find group(${group.name}) in result`);
  }
  return result;
}

export default function Panel({ channel }: { channel: Channel }) {
  const { state, service } = usePanelMachine(machine, channel);

  const parameters = useParameter(paramKey, { interactions: [] });
  // Note: this will keep a consistant reference between renders
  const interactions: TimedTask[] = parameters.interactions;

  const all = useMemo(function merge() {
    return interactions.length ? allGroups.concat(getInterationGroup(interactions)) : allGroups;
  }, [interactions])

  return (
    <ServiceContext.Provider value={service}>
      <Container>
        <Topbar />
        <GroupContainer>
          {all.map((group: TaskGroup) => {
            if (state.context.current.results == null) {
              return null;
            }
            return (
              <TaskGroupPanel
                key={group.name}
                group={group}
                result={getResult(group, state.context.current)}
                pinned={findResult(group, state.context.pinned)}
              />
            );
          })}
        </GroupContainer>
      </Container>
    </ServiceContext.Provider>
  );
}
