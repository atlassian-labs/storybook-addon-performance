import { addons } from '@storybook/addons';
import { Channel } from '@storybook/channels';
import React, { useEffect } from 'react';
import eventNames, { RunAll, RunOne } from '../events';
import { runAll, runOneStatic, runOneTimed } from '../task-runner';
import { getAll as getAll } from '../tasks/all';
import { AddInteractionTasks } from '../tasks/interactions';
import { StaticResult, TaskGroupResult, TimedResult, InteractionTaskBase } from '../types';
import getElement from '../task-runner/get-element';
import { bindAll } from '../util/bind-channel-events';


type Props = {
  getNode: () => React.ReactNode;
  channel: Channel;
  interactions?: InteractionTaskBase[];

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

      // Add any interaction tasks to list of tasks
      const all = interactions ?
        getAll(AddInteractionTasks(interactions)) :
        getAll();

      const unbindAll = bindAll(channel, [
        {
          eventName: eventNames.START_ALL,
          fn: async function onStartAll({ copies, samples }: RunAll['Params']) {
            const results: TaskGroupResult[] = await runAll({
              groups: all.groups,
              getNode,
              samples,
              copies,
            });
            safeEmit(eventNames.FINISH_ALL, { results });
          },
        },
        {
          eventName: eventNames.START_ONE,
          fn: async function onStartOne({ taskId, copies, samples }: RunOne['Params']) {
            const task = all.tasks[taskId];
            if (task == null) {
              throw new Error(`Could not find task with id: ${taskId}`);
            }

            if (task.type === 'timed') {
              const result: TimedResult = await runOneTimed({
                task,
                getNode,
                samples,
                copies,
              });
              safeEmit(eventNames.FINISH_ONE, { taskId, result });
              return;
            }
            if (task.type === 'static') {
              const result: StaticResult = await runOneStatic({
                task,
                getNode,
                copies,
              });
              safeEmit(eventNames.FINISH_ONE, { taskId, result });
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
    [channel, getNode],
  );

  return getElement(getNode)();
}
