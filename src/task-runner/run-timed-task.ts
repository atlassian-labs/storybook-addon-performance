import { ErrorResult, InteractionTask, TimedControls, TimedResult, TimedTask } from '../types';
import { asyncMap } from './async';
import getErrorResult from './get-error-result';
import mark from './mark';
import printError from './print-error';
import runInteractionTask from './run-interaction-task';
import withContainer from './with-container';
import withDuration from './with-duration';

function getAverage(values: number[]): number {
  return values.reduce((total: number, current: number) => total + current, 0) / values.length;
}

function getStandardDeviation(average: number, values: number[]): number {
  // Step 1: Get the average of values
  // Precomputed

  // Step 2: Subtract the average and square the result
  const squaredDifferences: number[] = values.map((value: number) => (value - average) ** 2);

  // Step 3: Get average of squared differences
  const squareDifferenceAverage: number = getAverage(squaredDifferences);

  // Step 4: Square root that new average
  return Math.sqrt(squareDifferenceAverage);
}

function getDifferenceFrom(relativeTo: number, target: number): number {
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
    lowerPercentage: getDifferenceFrom(average, lowest),
    upperPercentage: getDifferenceFrom(average, highest),
  };
}

type RepeatArgs = {
  task: TimedTask | InteractionTask;
  getElement: () => React.ReactElement;
  samples: number;
};

type TimedArgs = { task: TimedTask; getElement: () => React.ReactElement };

async function runTimedTask({ task, getElement }: TimedArgs): Promise<number> {
  return withContainer((container: HTMLElement) => {
    // wrapping the duration in 'mark' so that the timing is not impacted by the marking
    return mark(task.name, () =>
      withDuration((controls: TimedControls) => task.run({ controls, container, getElement })),
    );
  });
}

export async function getResultForTimedTask({
  task,
  getElement,
  samples,
}: RepeatArgs): Promise<TimedResult | ErrorResult> {
  try {
    const durations: number[] = await asyncMap({
      source: Array.from({ length: samples }),
      map: async function map(): Promise<number> {
        if (task.type === 'timed') {
          return runTimedTask({
            task,
            getElement,
          });
        }
        return runInteractionTask({
          task,
          getElement,
        });
      },
    });
    const average: number = getAverage(durations);
    const { upperPercentage, lowerPercentage } = getUpperAndLower(average, durations);
    const standardDeviation: number = getStandardDeviation(average, durations);

    const result: TimedResult = {
      type: 'timed',
      taskName: task.name,
      averageMs: average,
      samples,
      variance: {
        upperPercentage,
        lowerPercentage,
        standardDeviation,
      },
    };
    return result;
  } catch (error) {
    printError({ task, error });
    return getErrorResult({ task, error });
  }
}
