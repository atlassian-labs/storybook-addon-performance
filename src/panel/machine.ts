import { Machine, assign, Interpreter, StateMachine, State } from 'xstate';
import { Nullable, TaskGroupResult } from './../types';

export type MachineEvents =
  | { type: 'LOAD'; storyName: string; pinned: Nullable<RunContext> }
  | { type: 'START_ALL' }
  | { type: 'START_ONE'; taskId: string }
  | { type: 'FINISH'; results: TaskGroupResult[] }
  | { type: 'PIN' }
  | { type: 'UNPIN' }
  | { type: 'SET_VALUES'; copies: number; samples: number };

export type RunContext = {
  results: Nullable<TaskGroupResult[]>;
  samples: number;
  copies: number;
};

export type MachineContext = {
  message: Nullable<string>;
  sizes: number[];
  current: RunContext;
  storyName: string;
  pinned: Nullable<RunContext>;
};

export type MachineSchema = {
  states: {
    waiting: {};
    idle: {};
    running: {};
  };
};

export type StateType = State<MachineContext, MachineEvents, MachineSchema>;

export type ServiceType = Interpreter<MachineContext, MachineSchema, MachineEvents>;

export type MachineType = StateMachine<MachineContext, MachineSchema, MachineEvents>;

const machine: MachineType = Machine<MachineContext, MachineSchema, MachineEvents>(
  {
    id: 'panel',
    initial: 'waiting',
    context: {
      message: null,
      sizes: [1, 10, 100],
      storyName: 'unknown',
      current: {
        results: null,
        samples: 1,
        copies: 1,
      },
      pinned: null,
    },
    states: {
      waiting: {
        on: {
          LOAD: {
            target: 'idle',
            actions: assign(
              (context, event): MachineContext => {
                const message: Nullable<string> = event.pinned
                  ? `Loaded pinned result for story: ${event.storyName}`
                  : null;
                return {
                  ...context,
                  message,
                  pinned: event.pinned,
                  storyName: event.storyName,
                  current: event.pinned || context.current,
                };
              },
            ),
          },
        },
      },
      idle: {
        on: {
          // TODO
          // LOAD: 'idle',
          START_ALL: 'running',
          START_ONE: 'running',
          SET_VALUES: {
            internal: true,
            target: 'idle',
            cond: (context): boolean => {
              return context.pinned == null;
            },
            actions: assign({
              current: (context, event) => {
                return {
                  // clearing results as they are now invalid
                  results: null,
                  storyName: context.storyName,
                  samples: event.samples,
                  copies: event.copies,
                };
              },
            }),
          },
          PIN: {
            internal: true,
            target: 'idle',
            // Only allow pinning when there are results
            cond: (context): boolean => {
              return context.current.results != null;
            },
            actions: assign((context) => {
              return {
                ...context,
                pinned: context.current,
                message: 'Result pinned',
              };
            }),
          },
          UNPIN: {
            internal: true,
            target: 'idle',
            cond: (context): boolean => {
              return context.pinned != null;
            },
            // Doing this syntax as the following gives a typescript error
            // assign({ pinned: () => null })
            actions: assign((context) => {
              return {
                ...context,
                pinned: null,
                message: 'Pinned result removed',
              };
            }),
          },
        },
      },
      running: {
        on: {
          FINISH: {
            target: 'idle',
            actions: assign({
              current: (context, event): RunContext => {
                const current: RunContext = {
                  ...context.current,
                  results: event.results,
                };
                return current;
              },
            }),
          },
        },
      },
    },
  },
  {
    actions: {
      clearMessage: assign((context) => {
        return null;
      }),
    },
  },
);

export default machine;
