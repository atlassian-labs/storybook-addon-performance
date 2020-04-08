export type Nullable<T> = T | null;

type BaseTask = {
  taskId: string;
  name: string;
  description: string;
};

export type RunStaticTaskArgs = {
  getElement: () => React.ReactElement;
  container: HTMLElement;
};

export type StaticTask = BaseTask & {
  scale?: string;
  type: 'static';
  run: (args: RunStaticTaskArgs) => Promise<string>;
};

export type RunTimedTaskArgs = {
  getElement: () => React.ReactElement;
  controls: TimedTaskControls;
  container: HTMLElement;
};

export type TimedTask = BaseTask & {
  type: 'timed';
  run: (args: RunTimedTaskArgs) => Promise<void>;
};

export type TimedTaskControls = {
  time: (fn: () => Promise<void>) => Promise<void>;
};

export type PublicTimedTask = {
  name: string;
  description?: string;
  run: (args: RunTimedTaskArgs) => Promise<void>;
};

export type TaskGroup = {
  uniqueName: string;
  timed: TimedTask[];
  static: StaticTask[];
};

export type Variance = {
  standardDeviation: number;
  upperPercentage: number;
  lowerPercentage: number;
};

export type TimedResult = {
  taskId: string;
  averageMs: number;
  samples: number;
  variance: Variance;
};

export type StaticResult = {
  taskId: string;
  value: string;
};

export type TimedResultMap = {
  [taskId: string]: TimedResult;
};

export type StaticResultMap = {
  [taskId: string]: StaticResult;
};

export type TaskMap = {
  [taskId: string]: TimedTask | StaticTask;
};

export type TaskGroupResult = {
  groupName: string;
  timed: TimedResultMap;
  static: StaticResultMap;
};
