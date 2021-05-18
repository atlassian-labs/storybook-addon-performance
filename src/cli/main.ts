import * as fs from 'fs';
import * as path from 'path';
import type { TaskGroupResult } from '../types';
import type {
  ResultsByGroupId,
  Results,
  CalculationByGroupId,
  CalculationByDirectory,
} from './types';
import {
  debug,
  performCalculations,
  printCSV,
  stdout,
  usage,
  Row,
  printCSVSummary,
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
            `cli: Directory '${pathName}' is empty - did you specify a directory with storybook-addon-performance output files?`,
          );
        }
      } catch (e) {
        debug(
          `cli: Problem parsing a file in '${pathName}' - was this created by the storybook-addon-performance?`,
          e,
        );
      }

      return { name: '' };
    })
    .filter(({ name }) => name);

  const performAllCalculations = (
    calculationsByGroupId: CalculationByGroupId,
    [groupId, result]: [string, Results],
  ): CalculationByGroupId => ({
    ...calculationsByGroupId,
    [groupId]: performCalculations(result),
  });

  const output = directoryResultSets.reduce(
    (calculationsByDirectory, { name, ...resultsByGroupId }) => ({
      ...calculationsByDirectory,
      [path.basename(name)]: Object.entries(resultsByGroupId).reduce(
        performAllCalculations,
        {} as CalculationByGroupId,
      ),
    }),
    {} as CalculationByDirectory,
  );

  const outputPath = 'results.json';
  const content = JSON.stringify(output);
  fs.writeFile(outputPath, content, 'utf8', (e) => {
    if (e) {
      stdout('💔 An error occurred – ', e);
    }

    stdout(`✨ Output is saved to ${outputPath}!`);
  });
};

export default main;
