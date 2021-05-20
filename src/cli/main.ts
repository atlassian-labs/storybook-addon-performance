import * as fs from 'fs';
import * as path from 'path';

import type { TaskGroupResult } from '../types';

import calculate from './calculate';
import compare from './compare';
import generateAdf from './adf';

import type { ResultsByGroupId, Results } from './types';
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
  const categories = { current: '-c', baseline: '-b' };
  const flags = Object.values(categories);

  const inputPaths = input
    .map((arg, i) => (flags.includes(arg) ? { [arg]: input[i + 1] } : {}))
    .reduce((acc, val) => ({ ...acc, ...val }));

  if (Object.entries(inputPaths).length < 2) {
    return usage();
  }

  const dirPaths = [inputPaths[categories.baseline], inputPaths[categories.current]];
  const resultsByDirectory = dirPaths.map((pathName) => {
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
          return JSON.parse(json as any);
        })
        .map(({ results }) => results as TaskGroupResult[])
        .flatMap((taskGroupResults) => taskGroupResults)
        .map(({ groupId, map }) => [groupId, convertToTaskValueMap(map)] as [string, Results])
        .reduce(combineTaskResultsByGroupId, {} as ResultsByGroupId);

      return { name: pathName, ...resultsByGroupId };
    } catch (e) {
      return debug(
        `💔 Problem parsing a file in '${pathName}' - ` +
          'was this created by the storybook-addon-performance? \n',
        e,
      );
    }
  }) as (ResultsByGroupId & { name: string })[];

  /**
   * Calculate the mean, median, and max values of the inputs,
   * grouped by directory.
   */
  const calculationsByDirectory = calculate(resultsByDirectory);

  /**
   * Compare the median values of the current state
   * vs. the baseline.
   */
  const [baseline, current] = Object.values(calculationsByDirectory);
  const calculationsWithDiff = compare(baseline, current);

  /**
   * Format the results as ADF.
   */
  generateAdf(calculationsWithDiff);
};

export default main;
