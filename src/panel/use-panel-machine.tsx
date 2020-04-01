import addons from '@storybook/addons';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import eventNames, { RunAll, RunOne } from '../events';
import { StaticResult, TaskGroupResult, TimedResult } from '../types';
import { MachineType, StateType, MachineEvents } from './machine';
import { setPinned } from './query-string';

type MergeArgs = {
  existing: TaskGroupResult[];
  taskId: string;
  result: TimedResult | StaticResult;
};

function mergeWithResults({
  existing,
  taskId,
  result,
}: MergeArgs): TaskGroupResult[] {
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
  // const service: Interpreter<MachineContext, MachineSchema, MachineEvents> =
  //   output[2];

  useEffect(() => {
    const unsubscribable = service.subscribe(
      // @ts-ignore: unknown second event argument in type. This is fixed in master
      function next(state: StateType, event: MachineEvents) {
        if (!state.changed) {
          return;
        }
        if (event.type === 'PIN') {
          console.log('ON PIN: setting query params');
          setPinned(state.context.current);
          return;
        }

        const channel = addons.getChannel();
        const { samples, copies } = state.context.current;

        if (state.value === 'running' && event.type === 'START_ALL') {
          channel.once(
            eventNames.FINISH_ALL,
            ({ results }: RunAll['Results']) =>
              service.send('FINISH', { results }),
          );
          channel.emit(eventNames.START_ALL, {
            samples,
            copies,
          });
          return;
        }

        if (state.value === 'running' && event.type === 'START_ONE') {
          channel.once(
            eventNames.FINISH_ONE,
            ({ taskId, result }: RunOne['Result']) => {
              const results: TaskGroupResult[] = mergeWithResults({
                // we are using a state machine guard to prevent this
                existing: state.context.current.results!,
                result,
                taskId,
              });
              service.send('FINISH', { results });
            },
          );
          channel.emit(eventNames.START_ONE, {
            taskId: event.taskId,
            samples,
            copies,
          });
        }
      },
    );
    return unsubscribable.unsubscribe;
  }, [service]);

  return { state, send, service };
}
