import addons from '@storybook/addons';
import { useStorybookState } from '@storybook/api';
// import { useStorybookApi } from '@storybook/api';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import eventNames, { RunAll, RunOne } from '../events';
import { StaticResult, TaskGroupResult, TimedResult } from '../types';
import { MachineType, StateType, MachineEvents } from './machine';
import * as coreEvents from '@storybook/core-events';
import { savePinned, clearPinned, getPinned } from './pinned-storage';

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

  const channel = addons.getChannel();

  useEffect(() => {
    channel.on(coreEvents.STORY_RENDERED, (storyName: string) => {
      service.send('LOADED', { storyName, pinned: getPinned(storyName) });
    });

    channel.on(coreEvents.STORY_CHANGED, () => service.send('WAIT'));
  }, [channel]);

  useEffect(() => {
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
        if (event.type === 'PIN') {
          savePinned(state.context.storyName, state.context.current);
          // api.setQueryParams is currently not working https://github.com/storybookjs/storybook/issues/8600
          return;
        }
        if (event.type === 'UNPIN') {
          clearPinned(state.context.storyName);
          return;
        }

        const { samples, copies } = state.context.current;

        if (state.matches('active.running')) {
          if (event.type === 'START_ALL') {
            channel.once(eventNames.FINISH_ALL, ({ results }: RunAll['Results']) =>
              service.send('FINISH', { results }),
            );
            channel.emit(eventNames.START_ALL, {
              samples,
              copies,
            });
            return;
          }

          if (event.type === 'START_ONE') {
            channel.once(eventNames.FINISH_ONE, ({ taskId, result }: RunOne['Result']) => {
              const results: TaskGroupResult[] = mergeWithResults({
                // we are using a state machine guard to prevent this
                existing: state.context.current.results!,
                result,
                taskId,
              });
              service.send('FINISH', { results });
            });
            channel.emit(eventNames.START_ONE, {
              taskId: event.taskId,
              samples,
              copies,
            });
          }
        }
      },
    );
    return unsubscribable.unsubscribe;
  }, [service]);

  return { state, send, service };
}
