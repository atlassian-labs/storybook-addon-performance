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
export type PublicInteractionTask = Omit<InteractionTask, 'taskId' | 'description'> & {
  description?: string;
};

export type Task = TimedTask | StaticTask | InteractionTask;

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
  [taskId: string]: Task;
};

export type TaskGroupResult = {
  groupName: string;
  timed: TimedResultMap;
  static: StaticResultMap;
};
