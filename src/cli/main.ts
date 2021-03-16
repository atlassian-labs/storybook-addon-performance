/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import type { TaskGroupResult } from '../types';
import type { ResultByGroupId } from './types';
import {
  debug,
  prepRows,
  printCSV,
  stdout,
  usage,
  Row,
  printCSVSummary,
  convertToTaskValueMap,
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
            .reduce((resultSets, taskGroupResults) => {
              const resultsByGroupId = taskGroupResults.reduce(
                (resultsByGroupId, { groupId, map }: TaskGroupResult) => ({
                  ...resultsByGroupId,
                  [groupId]: convertToTaskValueMap(map),
                }),
                {} as ResultByGroupId,
              );

              Object.entries(resultsByGroupId).forEach(([groupId, taskValueMap]) => {
                Object.entries(taskValueMap).forEach(([taskName, value]) => {
                  resultSets[groupId] = {
                    ...resultSets[groupId],
                    [taskName]:
                      resultSets[groupId] && resultSets[groupId][taskName]
                        ? resultSets[groupId][taskName].concat(value)
                        : value,
                  };
                });
              });

              return resultSets;
            }, {} as ResultByGroupId);

          return { name: pathName, ...resultSetsByGroupId };
        } else {
          debug(
            `cli: Directory '${pathName}' is empty - did you specify a directory with storybook-addon-performance output files?`,
          );
        }
      } catch (e) {
        console.info(e);
        debug(
          `cli: Problem parsing a file in '${pathName}' - was this created by the storybook-addon-performance?`,
        );
      }

      return { name: '' };
    })
    .filter(({ name }) => name);

  const resultNames: string[] = [];
  const resultSets: Row[][] = [];

  directoryResultSets.forEach(({ name, ...rawResults }) => {
    const resultName = path.basename(name);
    stdout(resultName);

    Object.entries(rawResults).forEach(([groupId, result]) => {
      const preparedResults = prepRows(result);

      stdout(groupId);
      printCSV(preparedResults);
      resultSets.push(preparedResults);
    });

    stdout();
    resultNames.push(resultName);
  });

  printCSVSummary(resultNames, resultSets);
};

export default main;
