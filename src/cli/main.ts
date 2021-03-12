/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import type { TaskGroupResult } from '../types';
import type { ResultSet } from './types';
import {
  debug,
  prepRows,
  printCSV,
  processResult,
  stdout,
  usage,
  Row,
  printCSVSummary,
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
          return dataFiles
            .map((dataFile) => {
              const json = fs.readFileSync(path.join(pathName, dataFile));
              return JSON.parse(json as any);
            })
            .map(({ results }) => (results as TaskGroupResult[]).map(processResult))
            .reduce(
              (acc, [serverside, clientside]) => {
                serverside.forEach((serverResult) => {
                  const data = acc.server[serverResult.taskName];
                  // eslint-disable-next-line no-unused-expressions
                  data
                    ? data.push(serverResult.value)
                    : (acc.server[serverResult.taskName] = [serverResult.value]);
                });

                clientside.forEach((clientResult) => {
                  const data = acc.client[clientResult.taskName];
                  // eslint-disable-next-line no-unused-expressions
                  data
                    ? data.push(clientResult.value)
                    : (acc.client[clientResult.taskName] = [clientResult.value]);
                });

                return acc;
              },
              { name: pathName, server: {}, client: {} } as ResultSet,
            );
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

      return { name: '', server: {}, client: {} } as ResultSet;
    })
    .filter(({ name }) => name);

  const resultNames: string[] = [];
  const resultSets: Row[][] = [];

  directoryResultSets.forEach(({ name, server, client }) => {
    const resultName = path.basename(name);
    stdout(resultName);

    const serverResults = prepRows(server);
    const clientResults = prepRows(client);

    stdout('Serverside');
    printCSV(serverResults);

    stdout('Clientside');
    printCSV(clientResults);

    stdout();

    // used in summary
    resultNames.push(resultName);
    resultSets.push(serverResults.concat(clientResults));
  });

  printCSVSummary(resultNames, resultSets);
};

export default main;
