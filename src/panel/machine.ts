import { Machine, assign, Interpreter, StateMachine, State } from 'xstate';
import { Nullable, TaskGroupResult } from './../types';

export type MachineEvents =
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
  sizes: number[];
  current: RunContext;
  pinned: Nullable<RunContext>;
};

export type MachineSchema = {
  states: {
    idle: {};
    running: {};
  };
};

export type StateType = State<MachineContext, MachineEvents, MachineSchema>;

export type ServiceType = Interpreter<
  MachineContext,
  MachineSchema,
  MachineEvents
>;

export type MachineType = StateMachine<
  MachineContext,
  MachineSchema,
  MachineEvents
>;

const machine: MachineType = Machine<
  MachineContext,
  MachineSchema,
  MachineEvents
>({
  id: 'panel',
  initial: 'idle',
  context: {
    sizes: [1, 10, 100],
    current: {
      results: null,
      samples: 1,
      copies: 1,
    },
    pinned: null,
  },
  states: {
    idle: {
      on: {
        START_ALL: 'running',
        START_ONE: 'running',
        SET_VALUES: {
          target: 'idle',
          cond: (context): boolean => {
            return context.pinned == null;
          },
          actions: assign({
            current: (context, event) => {
              return {
                // clearing results as they are now invalid
                results: null,
                samples: event.samples,
                copies: event.copies,
              };
            },
          }),
        },
        PIN: {
          target: 'idle',
          // Only allow pinning when there are results
          cond: (context): boolean => {
            return context.current.results != null;
          },
          actions: assign({
            pinned: (context): RunContext => {
              return { ...context.current };
            },
          }),
        },
        UNPIN: {
          target: 'idle',
          cond: (context): boolean => {
            return context.pinned != null;
          },
          // Doing this syntax as the following gives a typescript error
          // assign({ pinned: () => null })
          actions: assign(context => {
            return {
              ...context,
              pinned: null,
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
});

export default machine;
