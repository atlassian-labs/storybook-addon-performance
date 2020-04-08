export type Nullable<T> = T | null;

type BaseTask = {
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
  name: string;
  timed: TimedTask[];
  static: StaticTask[];
};

export type Variance = {
  standardDeviation: number;
  upperPercentage: number;
  lowerPercentage: number;
};

export type TimedResult = {
  taskName: string;
  groupName: string;
  averageMs: number;
  samples: number;
  variance: Variance;
};

export type StaticResult = {
  taskName: string;
  groupName: string;
  value: string;
};

export type TimedResultMap = {
  [taskName: string]: TimedResult;
};

export type StaticResultMap = {
  [taskName: string]: StaticResult;
};

export type TaskMap = {
  [taskName: string]: TimedTask | StaticTask;
};

export type TaskGroupResult = {
  groupName: string;
  timed: TimedResultMap;
  static: StaticResultMap;
};
