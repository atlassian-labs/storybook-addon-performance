import * as fs from 'fs';
import * as path from 'path';
import type { TaskGroupResult } from '../types';
import type {
  ResultsByGroupId,
  Results,
  CalculationsByGroupId,
  CalculationsByDirectory,
} from './types';
import {
  convertToTaskValueMap,
  combineTaskResultsByGroupId,
  performAllCalculations,
} from './util/calculate';
import { debug, usage } from './util/print';
import { writeFile } from './util/write';

const main = (...args: string[]) => {
  const cliArgs = args.length ? args : process.argv;
  if (cliArgs.length <= 2) {
    return usage();
  }

  /**
   * Get storybook-addon-performance output files
   * in the specified directories. Format and group the outputs
   * per directory.
   */
  const directoryResultSets = cliArgs.slice(2).map((pathName) => {
    try {
      const dataFiles = fs.readdirSync(pathName);
      if (!dataFiles) {
        return debug(
          `💔 Directory '${pathName}' is empty - ` +
            'did you specify a directory with storybook-addon-performance output files?',
        );
      }

      const resultSetsByGroupId = dataFiles
        .map((dataFile) => {
          const json = fs.readFileSync(path.join(pathName, dataFile));
          return JSON.parse(json as any);
        })
        .map(({ results }) => results as TaskGroupResult[])
        .flatMap((taskGroupResults) => taskGroupResults)
        .map(({ groupId, map }) => [groupId, convertToTaskValueMap(map)] as [string, Results])
        .reduce(combineTaskResultsByGroupId, {} as ResultsByGroupId);

      return { name: pathName, ...resultSetsByGroupId };
    } catch (e) {
      return debug(
        `💔 Problem parsing a file in '${pathName}' - ` +
          'was this created by the storybook-addon-performance? \n',
        e,
      );
    }
  }) as (ResultsByGroupId & { name: string })[];

  /**
   * Calculate the max, min, median, and mean values
   * of the previously formatted outputs, and group the results
   * per directory.
   */
  const directoryOutputs = directoryResultSets.reduce(
    (calculationsByDirectory, { name, ...resultsByGroupId }) => ({
      ...calculationsByDirectory,
      [path.basename(name)]: Object.entries(resultsByGroupId).reduce(
        performAllCalculations,
        {} as CalculationsByGroupId,
      ),
    }),
    {} as CalculationsByDirectory,
  );

  /**
   * Write the results into files –
   * one file summarises one input directory.
   */
  Object.entries(directoryOutputs).forEach(([directoryName, output]) => {
    const outputPath = `${directoryName}.json`;
    const content = JSON.stringify(output);

    writeFile(outputPath, content, `Output is saved to ${outputPath}!`);
  });
};

export default main;
