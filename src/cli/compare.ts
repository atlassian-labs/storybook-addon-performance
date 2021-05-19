import * as fs from 'fs';
import { Calculation, CalculationsByGroupId } from './types';
import { calculateDifference } from './util/compare';
import { debug, stdout } from './util/print';
import { writeFile } from './util/write';

const compare = () => {
  if (process.argv.length <= 2) {
    return stdout('💔 Oh no! Please provide paths to the input files.');
  }

  /**
   * Get arguments passed to figure out which
   * input is the baseline.
   */
  const input = process.argv.slice(2);
  const categories = { '-l': 'Lite mode', '-b': 'Baseline' };
  const flags = Object.keys(categories);

  const inputPaths = input
    .map((arg, i) => (flags.includes(arg) ? { [arg]: input[i + 1] } : {}))
    .reduce((acc, val) => ({ ...acc, ...val }));

  const baselineString = fs.readFileSync(inputPaths['-b'], 'utf-8');
  const liteString = fs.readFileSync(inputPaths['-l'], 'utf-8');

  try {
    const baseline = JSON.parse(baselineString) as CalculationsByGroupId;
    const lite = JSON.parse(liteString) as CalculationsByGroupId;

    /**
     * Calculate the difference between the median value of each input,
     * and aggregate the output per test group ("Server", "Client", "Interactions").
     */
    const allDiffs = Object.entries(lite)
      .map(
        ([groupId, lite]) =>
          [groupId, lite, baseline[groupId]] as [string, Calculation[], Calculation[]],
      )
      .map(([groupId, lite, baseline]) => ({
        [groupId]: lite.map(calculateDifference(baseline)),
      }))
      .reduce((acc, val) => ({ ...acc, ...val }));

    const [baselinePath] = inputPaths['-b'].split('.');
    const [litePath] = inputPaths['-l'].split('.');

    const outputPath = `${litePath}-vs-${baselinePath}.json`;
    const content = JSON.stringify(allDiffs);

    writeFile(outputPath, content, `Difference is calculated and saved to ${outputPath}!`);
  } catch (e) {
    debug(
      `💔 Problem parsing a file in '${baselineString} and ${liteString}' - were these created by the storybook-addon-performance? \n`,
      e,
    );
  }
};

compare();
