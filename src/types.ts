export type Nullable<T> = T | null;
// Similar to {...A, ...B}
// 1. Remove all overlapping types from First
// 2. Add properties from Second
export type Combine<First, Second> = Omit<First, keyof Second> & Second;

type BaseTask = {
  taskId: string;
  name: string;
  description: string;
};

interface Container extends HTMLElement {
  _reactRootContainer?: any;
}

export type RunStaticTaskArgs = {
  getElement: () => React.ReactElement;
  container: HTMLElement;
};
export type RunStaticTaskArgsWithReactRoot = {
  getElement: () => React.ReactElement;
  container: Container;
};
export type StaticTask = BaseTask & {
  scale?: string;
  type: 'static';
  run: (args: RunStaticTaskArgs | RunStaticTaskArgsWithReactRoot) => Promise<string>;
};
export type TimedControls = {
  time: (fn: () => Promise<void>) => Promise<void>;
};

export type RunTimedTaskArgs = {
  getElement: () => React.ReactElement;
  controls: TimedControls;
  container: HTMLElement;
};

export type TimedTask = BaseTask & {
  type: 'timed';
  run: (args: RunTimedTaskArgs) => Promise<void>;
};

export type InteractionTaskArgs = {
  controls: TimedControls;
  container: HTMLElement;
};

export type InteractionTask = BaseTask & {
  type: 'interaction';
  run: (args: InteractionTaskArgs) => Promise<void>;
};

// This is what is provided as interactions to the addon by a consumer
export type PublicInteractionTask = Omit<InteractionTask, 'taskId' | 'description' | 'type'> & {
  description?: string;
};

export type Task = TimedTask | StaticTask | InteractionTask;

export type TaskGroup = {
  groupId: string;
  name: string;
  tasks: Task[];
};

export type Variance = {
  standardDeviation: number;
  upperPercentage: number;
  lowerPercentage: number;
};

export type TimedResult = {
  type: 'timed';
  taskId: string;
  averageMs: number;
  samples: number;
  variance: Variance;
};

export type StaticResult = {
  type: 'static';
  taskId: string;
  value: string;
};

export type ErrorResult = {
  type: 'error';
  taskId: string;
  reason: 'unsupported' | 'unhandled';
  message: Nullable<string>;
};

export type Result = TimedResult | StaticResult | ErrorResult;

export type ResultMap = {
  [taskId: string]: Result;
};

export type TaskMap = {
  [taskId: string]: Task;
};

export type TaskGroupResult = {
  groupId: string;
  map: ResultMap;
};
