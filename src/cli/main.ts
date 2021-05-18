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
  debug,
  performCalculations,
  stdout,
  usage,
  convertToTaskValueMap,
  combineTaskResultsByGroupId,
} from './utils';

const main = (...args: string[]) => {
  const cliArgs = args.length ? args : process.argv;
  if (cliArgs.length <= 2) {
    return usage();
  }

  // first up grab the CLI arguments
  const directoryResultSets = cliArgs
    .slice(2)
    .map((pathName) => {
      try {
        const dataFiles = fs.readdirSync(pathName);

        if (dataFiles) {
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
        } else {
          debug(
            `💔 Directory '${pathName}' is empty - did you specify a directory with storybook-addon-performance output files?`,
          );
        }
      } catch (e) {
        debug(
          `💔 Problem parsing a file in '${pathName}' - was this created by the storybook-addon-performance? \n`,
          e,
        );
      }

      return { name: '' };
    })
    .filter(({ name }) => name);

  const performAllCalculations = (
    calculationsByGroupId: CalculationsByGroupId,
    [groupId, result]: [string, Results],
  ): CalculationsByGroupId => ({
    ...calculationsByGroupId,
    [groupId]: performCalculations(result),
  });

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

  Object.entries(directoryOutputs).forEach(([directoryName, output]) => {
    const outputPath = `${directoryName}.json`;
    const content = JSON.stringify(output);

    fs.writeFile(outputPath, content, 'utf8', (e) => {
      if (e) {
        return debug('💔 An error occurred – ', e);
      }

      stdout(`✨ Output is saved to ${outputPath}!`);
    });
  });
};

export default main;
