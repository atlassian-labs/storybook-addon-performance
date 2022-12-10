import * as fs from 'fs';
import * as path from 'path';

import type { TaskGroupResult } from 'storybook-addon-performance';

import calculate from './calculate';
import compare from './compare';
import generateAdf from './adf';

import type { ResultsByGroupId, Results, ResultType } from './types';
import { convertToTaskValueMap, combineTaskResultsByGroupId } from './util/calculate';
import { debug, usage } from './util/print';

const main = (...args: string[]) => {
  /**
   * Get storybook-addon-performance result files
   * in the specified directories.
   */
  const cliArgs = args.length ? args : process.argv;
  if (cliArgs.length <= 2) {
    return usage();
  }

  const input = cliArgs.slice(2);
  const resultTypes: { [flag: string]: ResultType } = { '-b': 'baseline', '-c': 'current' };
  const flags = Object.keys(resultTypes);

  const inputPaths = input
    .map((arg, i) => (flags.includes(arg) ? { [resultTypes[arg]]: input[i + 1] } : {}))
    .reduce((acc, val) => ({ ...acc, ...val }));

  if (Object.entries(inputPaths).length < 2) {
    return usage();
  }

  const resultsByType = Object.entries(inputPaths).map(([type, pathName]) => {
    const files = fs.readdirSync(pathName, 'utf-8');
    if (!files) {
      return debug(
        `💔 Directory '${pathName}' is empty - ` +
          'did you specify a directory with storybook-addon-performance output files?',
      );
    }

    try {
      /**
       *  Format and group the inputs per directory.
       */
      const resultsByGroupId = files
        .map((dataFile) => {
          const json = fs.readFileSync(path.join(pathName, dataFile));
          return JSON.parse(json.toString());
        })
        .map(({ results }): TaskGroupResult[] => results)
        .flatMap((taskGroupResults) => taskGroupResults)
        .map(({ groupId, map }): [string, Results] => [groupId, convertToTaskValueMap(map)])
        .reduce(combineTaskResultsByGroupId, {} as ResultsByGroupId);

      return { type, ...resultsByGroupId };
    } catch (e) {
      return debug(
        `💔 Problem parsing a file in '${pathName}' - ` +
          'was this created by the storybook-addon-performance? \n',
        e,
      );
    }
  }) as (ResultsByGroupId & { type: ResultType })[];

  /**
   * Calculate the mean, median, and max values of the inputs,
   * grouped by result type (baseline vs. current).
   */
  const calulationsByResultType = calculate(resultsByType);

  /**
   * Compare the median values of the current state
   * vs. the baseline.
   */
  const { baseline, current } = calulationsByResultType;
  const calculationsWithDiff = compare(baseline, current);

  /**
   * Format the results as ADF.
   */
  generateAdf(calculationsWithDiff);
};

export default main;
