/* eslint-disable no-console */
import type { TaskGroupResult } from '../types';
import { Results } from './types';

export const debug = (...args: string[]) => console.warn(...args);
export const stdout = (...args: string[]) => console.log(...args);

export const usage = () =>
  debug(`Usage:
sb-perf <directory> [...<directory>]

Example
sb-perf results-directory > output-file.csv
# OR
sb-perf ABTestDirectory OtherDirectory > output-file.csv
`);

/**
 * Flattens out the result to a form we can consume
 */
export const processResult = (result: TaskGroupResult) => {
  return Object.keys(result.map).map((key) => {
    // @ts-ignore
    const { taskName, averageMs, value } = result.map[key];
    return {
      taskName,
      value: averageMs !== undefined ? averageMs : Number(value),
    };
  });
};

export const median = (numbers: number[]) => {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

export const prepRows = (data: Results) => {
  // extracts the number of samples the dataset
  const numResults = Object.values(data)[0].length;
  return Object.entries(data).map(([key, values]) => ({
    key,
    numResults,
    samples: values.join(','),
    minValue: Math.min(...values),
    maxValue: Math.max(...values),
    meanValue: values.reduce((acc, curr) => acc + curr, 0) / numResults,
    medianValue: median(values),
  }));
};

export type Row = ReturnType<typeof prepRows>[number];

/**
 * Turns the row output into a csv
 */
export const printCSV = (rows: Row[]) => {
  // extracts the number of samples the dataset
  const numResults = rows[0].numResults;
  stdout(
    `type,${Array.from({ length: numResults })
      .map((_, i) => `#${i + 1}`)
      .join(',')},min,max,mean,median`,
  );
  rows.forEach(({ key, samples, minValue, maxValue, meanValue, medianValue }) => {
    stdout(`${key},${samples},${minValue},${maxValue},${meanValue},${medianValue}`);
  });
};

export const printCSVSummary = (resultNames: string[], results: Row[][]) => {
  debug(`Type | ${resultNames.join(' | ')}`);
  debug(`===========================================`);
  stdout(`Type,${resultNames.join(',')}`);
  const toPrint = {} as any;
  results.forEach((rows) => {
    rows.forEach(({ key, medianValue }) => {
      if (toPrint[key]) {
        toPrint[key].push(medianValue);
      } else {
        toPrint[key] = [medianValue];
      }
    });
  });
  Object.entries(toPrint).forEach(([key, values]) => {
    debug(`${key} | ${(values as string[]).join(' | ')}`);
    stdout(`${key},${(values as string[]).join(',')}`);
  });
};
