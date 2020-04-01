import { TimedTask, TimedResult } from '../types';
import runTimedTask from './run-timed-task';
import { asyncMap } from './async';

function getAverage(values: number[]): number {
  return (
    values.reduce((total: number, current: number) => total + current, 0) /
    values.length
  );
}

function getStandardDeviation(average: number, values: number[]): number {
  // Step 1: Get the average of values
  // Precomputed

  // Step 2: Subtract the average and square the result
  const squaredDifferences: number[] = values.map(
    (value: number) => (value - average) ** 2,
  );

  // Step 3: Get average of squared differences
  const squareDifferenceAverage: number = getAverage(squaredDifferences);

  // Step 4: Square root that new average
  return Math.sqrt(squareDifferenceAverage);
}

function getVarianceFrom(relativeTo: number, target: number): number {
  // we want the raw difference between the base and target
  const diff: number = Math.abs(target - relativeTo);
  return (diff / relativeTo) * 100;
}

function getUpperAndLower(
  average: number,
  values: number[],
): { upperPercentage: number; lowerPercentage: number } {
  const ordered: number[] = [...values].sort((a, b) => a - b);
  const lowest: number = ordered[0];
  const highest: number = ordered[ordered.length - 1];

  return {
    lowerPercentage: getVarianceFrom(average, lowest),
    upperPercentage: getVarianceFrom(average, highest),
  };
}

type RepeatArgs = {
  task: TimedTask;
  getElement: () => React.ReactElement;
  samples: number;
};

export default async function runTimedTaskRepeatedly({
  task,
  getElement,
  samples,
}: RepeatArgs): Promise<TimedResult> {
  const durations: number[] = await asyncMap({
    source: Array.from({ length: samples }),
    map: async function map(): Promise<number> {
      const duration: number = await runTimedTask({
        task,
        getElement,
      });
      return duration;
    },
  });

  const average: number = getAverage(durations);
  const { upperPercentage, lowerPercentage } = getUpperAndLower(
    average,
    durations,
  );
  const standardDeviation: number = getStandardDeviation(average, durations);

  const result: TimedResult = {
    taskId: task.taskId,
    averageMs: average,
    samples,
    variance: {
      upperPercentage,
      lowerPercentage,
      standardDeviation,
    },
  };
  return result;
}
