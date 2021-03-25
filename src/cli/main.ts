import * as fs from 'fs';
import * as path from 'path';
import type { TaskGroupResult } from '../types';
import type { ResultsByGroupId, Results } from './types';
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

  const resultNames: string[] = [];
  const resultSets: Row[][] = [];

  directoryResultSets.forEach(({ name, ...resultsByGroupId }) => {
    const resultName = path.basename(name);
    stdout(resultName);

    Object.entries(resultsByGroupId).forEach(([groupId, result]) => {
      const finalResults = performCalculations(result);

      stdout(groupId);
      printCSV(finalResults);
      resultSets.push(finalResults);
    });

    stdout();
    resultNames.push(resultName);
  });

  printCSVSummary(resultNames, resultSets);
};

export default main;
