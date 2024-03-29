import type { Result, ResultMap } from 'storybook-addon-performance';
import { ResultsByGroupId, Results, Calculation } from '../types';

const getTaskValue = (result: Result) => {
  if ('averageMs' in result) {
    return result.averageMs;
  }

  if ('value' in result) {
    return Number(result.value);
  }

  return null;
};

export const convertToTaskValueMap = (resultMap: ResultMap) => {
  return Object.values(resultMap).reduce((acc, result) => {
    return { ...acc, [result.taskName]: [getTaskValue(result)] };
  }, {});
};

export const combineTaskResultsByGroupId = (
  results: ResultsByGroupId,
  [groupId, taskValueMap]: [string, Results],
) => {
  Object.entries(taskValueMap).forEach(([taskName, value]) => {
    results[groupId] = {
      ...results[groupId],
      [taskName]:
        results[groupId] && results[groupId][taskName]
          ? results[groupId][taskName].concat(value)
          : value,
    };
  });

  return results;
};

export const median = (numbers: number[]) => {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

export const performCalculations = (data: Results): Calculation[] => {
  // extracts the number of samples in the dataset
  const numberOfSamples = Object.values(data)[0].length;
  return Object.entries(data).map(([key, values]) => ({
    key,
    numberOfSamples,
    samples: values,
    minValue: Math.min(...values),
    maxValue: Math.max(...values),
    meanValue: values.reduce((acc, curr) => acc + curr, 0) / numberOfSamples,
    medianValue: median(values),
  }));
};
