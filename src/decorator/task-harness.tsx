import { addons } from '@storybook/addons';
import { Channel } from '@storybook/channels';
import React, { useEffect } from 'react';
import eventNames, { RunAll, RunOne } from '../events';
import { runAll, runOneStatic, runOneTimed } from '../task-runner/runner';
import all from '../tasks/all';
import { StaticResult, TaskGroupResult, TimedResult } from '../types';
import getElement from '../task-runner/get-element';
import { bindAll } from '../util/bind-channel-events';

type Props = {
  getNode: () => React.ReactNode;
};

export default function TaskHarness({ getNode }: Props) {
  // This is a stable reference between renders
  // When a story changes, it will remount this harness
  // @ts-ignore
  const channel: Channel = addons.getChannel();

  useEffect(
    function setup() {
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
            channel.emit(eventNames.FINISH_ALL, { results });
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
              channel.emit(eventNames.FINISH_ONE, { taskId, result });
              return;
            }
            if (task.type === 'static') {
              const result: StaticResult = await runOneStatic({
                task,
                getNode,
                copies,
              });
              channel.emit(eventNames.FINISH_ONE, { taskId, result });
              return;
            }
          },
        },
      ]);

      return unbindAll;
    },
    [channel, getNode],
  );

  return getElement(getNode)();
}
