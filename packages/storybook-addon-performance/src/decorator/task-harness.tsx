import { addons } from '@storybook/addons';
import { Channel } from '@storybook/channels';
import React, { useMemo, useEffect } from 'react';
import eventNames, { RunAll, RunOne } from '../events';
import { runAll, runOneStatic, runOneTimed } from '../task-runner';
import { getInteractionGroup } from '../tasks/get-interaction-group';
import {
  StaticResult,
  TaskGroupResult,
  TimedResult,
  PublicInteractionTask,
  TaskGroup,
  TaskMap,
  ErrorResult,
  AllowedGroup,
} from '../types';
import getElement from '../task-runner/get-element';
import { bindAll } from '../util/bind-channel-events';
import preset from '../tasks/preset';
import getTaskMap from '../tasks/get-tasks-map';
import { getGroups } from '../tasks/get-groups';

type Props = {
  getNode: () => React.ReactNode;
  channel: Channel;
  interactions: PublicInteractionTask[];
  allowedGroups: AllowedGroup[];
};

export default function TaskHarness({ getNode, channel, interactions, allowedGroups }: Props) {
  const groups: TaskGroup[] = useMemo(
    function merge() {
      return getGroups({
        allowedGroups,
        interactions: interactions,
      });
    },
    [interactions, allowedGroups],
  );
  const tasks: TaskMap = useMemo(() => getTaskMap(groups), [groups]);

  useEffect(
    function setup() {
      function safeEmit(name: string, args: Record<string, any>) {
        if (!safeEmit.isEnabled) {
          return;
        }
        channel.emit(name, args);
      }
      // this is how we store the state of the bindings
      // we cannot publish the finish events after this has already been disguarded
      safeEmit.isEnabled = true;

      const unbindAll = bindAll(channel, [
        {
          eventName: eventNames.START_ALL,
          fn: async function onStartAll({ copies, samples }: RunAll['Params']) {
            const results: TaskGroupResult[] = await runAll({
              groups,
              getNode,
              samples,
              copies,
            });
            safeEmit(eventNames.FINISH_ALL, { results });
          },
        },
        {
          eventName: eventNames.START_ONE,
          fn: async function onStartOne({ taskName, copies, samples }: RunOne['Params']) {
            const task = tasks[taskName];
            if (task == null) {
              throw new Error(`Could not find task with id: ${taskName}`);
            }

            if (task.type === 'timed' || task.type === 'interaction') {
              const result: TimedResult | ErrorResult = await runOneTimed({
                task,
                getNode,
                samples,
                copies,
              });
              safeEmit(eventNames.FINISH_ONE, { taskName, result });
              return;
            }
            if (task.type === 'static') {
              const result: StaticResult | ErrorResult = await runOneStatic({
                task,
                getNode,
                copies,
              });
              safeEmit(eventNames.FINISH_ONE, { taskName, result });
              return;
            }
          },
        },
      ]);

      return function unbind() {
        unbindAll();
        safeEmit.isEnabled = false;
      };
    },
    [channel, getNode, interactions, groups, tasks],
  );

  return getElement(getNode)();
}
