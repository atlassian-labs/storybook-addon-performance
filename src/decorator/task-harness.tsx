import { addons } from '@storybook/addons';
import { Channel } from '@storybook/channels';
import React, { useEffect } from 'react';
import eventNames, { RunAll, RunOne } from '../events';
import { runAll, runOneStatic, runOneTimed } from '../task-runner';
import allGroups from '../tasks/all';
import { getInterationGroup } from '../tasks/interactions';
import { StaticResult, TaskGroupResult, TimedResult, PublicTimedTask } from '../types';
import getElement from '../task-runner/get-element';
import { bindAll } from '../util/bind-channel-events';


type Props = {
  getNode: () => React.ReactNode;
  channel: Channel;
  interactions?: PublicTimedTask[];

};

export default function TaskHarness({ getNode, channel, interactions }: Props) {

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

      // Add any interaction tasks to list of tasks and add to channel
      const all = interactions ? allGroups.concat(getInterationGroup(interactions)) : allGroups;
      console.log(all);

      const unbindAll = bindAll(channel, [
        {
          eventName: eventNames.START_ALL,
          fn: async function onStartAll({ copies, samples }: RunAll['Params']) {
            const results: TaskGroupResult[] = await runAll({
              groups: all,
              getNode,
              samples,
              copies,
            });
            safeEmit(eventNames.FINISH_ALL, { results });
          },
        },
        {
          eventName: eventNames.START_ONE,
          fn: async function onStartOne({ taskName, groupName, copies, samples }: RunOne['Params']) {

            const group = all.find(group => { group.name === groupName });

            if (group == null) {
              throw new Error(`Could not find group with name: ${groupName}`);
            }
            const tasks = [...group.timed, ...group.static]
            const task = tasks.find(task => { task.name === taskName });

            if (task == null) {
              throw new Error(`Could not find task with name: ${taskName}`);
            }

            if (task.type === 'timed') {
              const result: TimedResult = await runOneTimed({
                task,
                group,
                getNode,
                samples,
                copies,
              });
              safeEmit(eventNames.FINISH_ONE, { taskName, groupName, result });
              return;
            }
            if (task.type === 'static') {
              const result: StaticResult = await runOneStatic({
                task,
                group,
                getNode,
                copies,
              });
              safeEmit(eventNames.FINISH_ONE, { taskName, groupName, result });
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
    [channel, getNode, interactions],
  );

  return getElement(getNode)();
}
