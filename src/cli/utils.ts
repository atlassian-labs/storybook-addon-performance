/* eslint-disable no-console */
import type { TaskGroupResult } from '../types';
import { Results } from './types';

/**
 * Flattens out the result to a form we can consume
 */
export const processResult = (result: TaskGroupResult) => {
  return Object.keys(result.map).map((key) => {
    // @ts-ignore
    const { taskName, averageMs, value } = result.map[key];
    return {
      taskName,
      value: averageMs || Number(value),
    };
  });
};

/**
 * Turns the row output into a csv
 */
export const rowify = (data: Results) => {
  // extracts the number of samples the dataset
  const numResults = Object.values(data)[0].length;
  console.info(
    `type,${Array.from({ length: numResults })
      .map((_, i) => `#${i + 1}`)
      .join(',')},min,max,ave`,
  );
  Object.entries(data).forEach(([key, values]) => {
    console.info(
      `${key}, ${values.join(',')},${Math.min(...values)}, ${Math.max(...values)}, ${
        values.reduce((acc, curr) => acc + curr, 0) / numResults
      }`,
    );
  });
};

export const usage = () =>
  console.warn(`Usage:
storybook-addon-performance <directory> [...<directory>] 

Example
storybook-addon-performance results-directory > output-file.csv
# OR
storybook-addon-performance ABTestDirectory OtherDirectory > output-file.csv
`);
