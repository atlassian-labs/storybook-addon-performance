import * as fs from 'fs';

import { buildTable, buildNameCell, buildResultCell, buildAdf } from './build-adf';
import { CalculationsByGroupId } from './types';
import { debug, stdout } from './utils';

const adf = (...args: string[]) => {
  const cliArgs = args.length ? args : process.argv;
  if (cliArgs.length <= 2) {
    return stdout('💔 Oh no! Please provide a path to the input file.');
  }

  const [inputPath] = cliArgs.slice(2);
  const [inputFileName] = inputPath.split('.');

  fs.readFile(`${inputFileName}.json`, 'utf-8', (e, data) => {
    if (e) {
      return stdout('💔 An error occurred – ', e);
    }

    try {
      const calculationsByGroupId = JSON.parse(data) as CalculationsByGroupId;
      const outputTables = Object.entries(calculationsByGroupId)
        .map(([key, results]) => {
          const rows = results.map(({ key, numberOfSamples, samples, medianValue }) => {
            const name = buildNameCell(key);
            const baseline = buildResultCell(medianValue, numberOfSamples, samples);
            const lite = buildResultCell(medianValue, numberOfSamples, samples);

            return {
              type: 'tableRow',
              content: [name, baseline, lite],
            };
          });

          return buildTable(key, rows);
        })
        .flatMap((table) => table);

      const adf = buildAdf(outputTables);

      const outputPath = `${inputFileName}-adf.json`;
      const content = JSON.stringify(adf);

      fs.writeFile(outputPath, content, 'utf8', (e) => {
        if (e) {
          return debug('💔 An error occurred – ', e);
        }

        stdout(`✨ Generated ADF is saved to ${outputPath}!`);
      });
    } catch (e) {
      debug(
        `💔 Problem parsing a file in '${inputPath}' - was this created by the storybook-addon-performance? \n`,
        e,
      );
    }
  });
};

adf();
