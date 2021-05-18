import * as fs from 'fs';

import { buildTable, buildNameCell, buildResultCell, buildAdf, Content } from './build-adf';
import { Calculation, CalculationsByGroupId } from './types';
import { debug, stdout } from './utils';

const adf = () => {
  if (process.argv.length <= 2) {
    return stdout('💔 Oh no! Please provide a path to the input file.');
  }

  const [inputPath] = process.argv.slice(2);
  const [inputFileName] = inputPath.split('.');

  const data = fs.readFileSync(`${inputFileName}.json`, 'utf-8');

  try {
    const calculationsByGroupId = JSON.parse(data) as CalculationsByGroupId;
    const outputTables = Object.entries(calculationsByGroupId)
      .map(([key, results]) => buildTable(key, results.map(buildTableRows)))
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
};

const buildTableRows = ({ key, numberOfSamples, samples, medianValue }: Calculation): Content => {
  const name = buildNameCell(key);
  const baseline = buildResultCell(medianValue, numberOfSamples, samples);
  const lite = buildResultCell(medianValue, numberOfSamples, samples);

  return {
    type: 'tableRow',
    content: [name, baseline, lite],
  };
};

adf();
