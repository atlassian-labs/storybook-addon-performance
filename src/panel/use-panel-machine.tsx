import addons from '@storybook/addons';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import { Channel } from '@storybook/channels';
import eventNames, { RunAll, RunOne } from '../events';
import { StaticResult, TaskGroupResult, TimedResult } from '../types';
import { MachineType, StateType, MachineEvents } from './machine';
import * as coreEvents from '@storybook/core-events';
import { savePinned, clearPinned, getPinned } from './pinned-storage';
import { bindAll } from '../util/bind-channel-events';

type MergeArgs = {
  existing: TaskGroupResult[];
  taskId: string;
  result: TimedResult | StaticResult;
};

function mergeWithResults({ existing, taskId, result }: MergeArgs): TaskGroupResult[] {
  return existing.map((groupResult: TaskGroupResult) => {
    if (groupResult.static[taskId]) {
      return {
        ...groupResult,
        static: {
          ...groupResult.static,
          [taskId]: result as StaticResult,
        },
      };
    }

    if (groupResult.timed[taskId]) {
      return {
        ...groupResult,
        timed: {
          ...groupResult.timed,
          [taskId]: result as TimedResult,
        },
      };
    }

    return groupResult;
  });
}

export default function usePanelMachine(machine: MachineType) {
  const [state, send, service] = useMachine(machine);

  // @ts-ignore: Channel is being typed wrong
  const channel: Channel = addons.getChannel();

  useEffect(
    function bindChannelEvents() {
      const unsubscribe = bindAll(channel, [
        {
          eventName: coreEvents.STORY_RENDERED,
          fn: (storyName: string) => {
            service.send('LOADED', { storyName, pinned: getPinned(storyName) });
          },
        },
        {
          eventName: coreEvents.STORY_CHANGED,
          fn: () => service.send('WAIT'),
        },
      ]);

      return unsubscribe;
    },
    [service, channel],
  );

  useEffect(() => {
    function finishAll({ results }: RunAll['Results']) {
      service.send('FINISH', { results });
    }

    function finishOne({ taskId, result }: RunOne['Result']) {
      const results: TaskGroupResult[] = mergeWithResults({
        // we are using a state machine guard to prevent this
        existing: service.state.context.current.results!,
        result,
        taskId,
      });
      service.send('FINISH', { results });
    }

    const unbindChannel = bindAll(channel, [
      { eventName: eventNames.FINISH_ALL, fn: finishAll },
      { eventName: eventNames.FINISH_ONE, fn: finishOne },
    ]);

    const unsubscribable = service.subscribe(
      // @ts-ignore: unknown second event argument in type. This is fixed in master
      function next(state: StateType, event: MachineEvents | undefined) {
        if (!state.changed) {
          return;
        }
        // This can happen on startup
        if (!event) {
          return;
        }
        const { current, storyName } = state.context;

        if (event.type === 'PIN') {
          savePinned(storyName, current);
          // api.setQueryParams is currently not working https://github.com/storybookjs/storybook/issues/8600
          return;
        }
        if (event.type === 'UNPIN') {
          clearPinned(storyName);
          return;
        }

        const { samples, copies } = current;

        if (state.matches('active.running')) {
          if (event.type === 'START_ALL') {
            channel.emit(eventNames.START_ALL, {
              samples,
              copies,
            });
            return;
          }

          if (event.type === 'START_ONE') {
            channel.emit(eventNames.START_ONE, {
              taskId: event.taskId,
              samples,
              copies,
            });
          }
        }
      },
    );
    return function unsubscribe() {
      unbindChannel();
      unsubscribable.unsubscribe();
    };
  }, [service, channel]);

  return { state, send, service };
}
