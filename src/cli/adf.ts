import * as fs from 'fs';

import { buildTable, buildNameCell, buildResultCell, buildAdf, Content } from './build-adf';
import { Calculation, CalculationsByGroupId, CalculationWithDiff } from './types';
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

const buildTableRows = (result: CalculationWithDiff | Calculation): Content => {
  const name = buildNameCell(result.key);

  if ('diffPercentage' in result) {
    const { baseline, lite, diffPercentage } = result;
    return {
      type: 'tableRow',
      content: [name, buildResultCell(baseline), buildResultCell(lite, diffPercentage)],
    };
  }

  const missingBaseline = {
    medianValue: 0,
    numberOfSamples: 0,
    samples: [0],
    minValue: 0,
    maxValue: 0,
    meanValue: 0,
  };

  return {
    type: 'tableRow',
    content: [name, buildResultCell(missingBaseline), buildResultCell(result)],
  };
};

adf();
