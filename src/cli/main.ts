/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import type { TaskGroupResult } from '../types';
import type { ResultSet } from './types';
import { processResult, rowify, usage } from './utils';

const main = (...args: string[]) => {
  const cliArgs = args || process.argv;

  if (cliArgs.length <= 2) {
    return usage();
  }

  // first up grab the CLI arguments
  const resultSetsFromDirs = cliArgs
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
            .map(({ results }) => results as TaskGroupResult[])
            .map((results) => results.map(processResult))
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
          console.warn(
            `cli: Directory '${fullPath}' is empty - did you specify a directory with storybook-addon-performance output files?`,
          );
        }
      } catch (e) {
        console.warn(
          `cli: Problem parsing a file in '${pathName}' - was this created by the storybook-addon-performance?`,
        );
      }

      return { name: '', server: {}, client: {} } as ResultSet;
    })
    .filter(({ name }) => name);

  resultSetsFromDirs.forEach(({ name, server, client }) => {
    console.info(name);
    console.info('Serverside');
    rowify(server, resultSetsFromDirs.length);

    console.info('Clientside');
    rowify(client, resultSetsFromDirs.length);
  });
};

export default main;
