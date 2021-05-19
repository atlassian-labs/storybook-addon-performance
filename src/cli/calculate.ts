import * as path from 'path';

import { CalculationsByDirectory, CalculationsByGroupId, ResultsByGroupId } from './types';
import { performAllCalculations } from './util/calculate';
import { writeFile } from './util/write';

const calculate = (resultsByDirectory: (ResultsByGroupId & { name: string })[]) => {
  /**
   * Calculate the max, min, median, and mean values
   * of the previously formatted outputs, and group the results
   * per directory.
   */
  const calculationsByDirectory = resultsByDirectory.reduce(
    (calculationsByDirectory, { name, ...resultsByGroupId }) => ({
      ...calculationsByDirectory,
      [path.basename(name)]: Object.entries(resultsByGroupId).reduce(
        performAllCalculations,
        {} as CalculationsByGroupId,
      ),
    }),
    {} as CalculationsByDirectory,
  );

  /**
   * Write the results into files –
   * one file summarises one input directory.
   */
  Object.entries(calculationsByDirectory).forEach(([directoryName, output]) => {
    const outputPath = `p-${directoryName}.json`;
    const content = JSON.stringify(output);

    writeFile(outputPath, content, `Output is saved to ${outputPath}!`);
  });

  /**
   * Return the results to be compared against each other.
   */
  return calculationsByDirectory;
};

export default calculate;
