import * as fs from 'fs';

import { buildTable, buildAdf, buildTableRows } from './util/adf';
import { CalculationsByGroupId } from './types';
import { debug, stdout } from './util/print';
import { writeFile } from './util/write';

const adf = () => {
  if (process.argv.length <= 2) {
    return stdout('💔 Oh no! Please provide a path to the input file.');
  }

  /**
   * Get arguments passed to find the file
   * with the formatted output.
   */
  const [inputPath] = process.argv.slice(2);
  const [inputFileName] = inputPath.split('.');

  const data = fs.readFileSync(`${inputFileName}.json`, 'utf-8');

  try {
    /**
     * Build one table + heading for each test group ("Server", "Client", "Interactions"),
     * containing measurements for lite mode + its baseline, and
     * the difference as a percent.
     */
    const calculationsByGroupId = JSON.parse(data) as CalculationsByGroupId;
    const outputTables = Object.entries(calculationsByGroupId)
      .map(([key, results]) => buildTable(key, results.map(buildTableRows)))
      .flatMap((table) => table);

    const adf = buildAdf(outputTables);

    const outputPath = `${inputFileName}-adf.json`;
    const content = JSON.stringify(adf);

    writeFile(outputPath, content, `Generated ADF is saved to ${outputPath}!`);
  } catch (e) {
    debug(
      `💔 Problem parsing a file in '${inputPath}' - was this created by the storybook-addon-performance? \n`,
      e,
    );
  }
};

adf();
