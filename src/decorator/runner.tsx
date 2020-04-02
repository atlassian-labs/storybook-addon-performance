import { addons } from '@storybook/addons';
import { Channel } from '@storybook/channels';
import React, { useEffect } from 'react';
import eventNames, { RunAll, RunOne } from '../events';
import { runAll, runOneStatic, runOneTimed } from '../task-runner/runner';
import all from '../tasks/all';
import { StaticResult, TaskGroupResult, TimedResult } from '../types';
import getElement from '../task-runner/get-element';

type Props = {
  getNode: () => React.ReactNode;
};

type Binding = {
  eventName: string;
  fn: (...args: any[]) => void;
};

function bind(channel: Channel, binding: Binding) {
  channel.on(binding.eventName, binding.fn);
  return function unbind() {
    channel.off(binding.eventName, binding.fn);
  };
}

function bindAll(channel: Channel, bindings: Binding[]) {
  const unbinds: Function[] = bindings.map((binding: Binding) => bind(channel, binding));

  return function unbindAll() {
    unbinds.forEach((unbind: Function) => unbind());
  };
}

export default function Runner({ getNode }: Props) {
  // channel will have a stable reference across run
  // @ts-ignore
  const channel: Channel = addons.getChannel();

  // console.log('parameter value', value);

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
