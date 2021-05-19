import { Calculation, CalculationsByGroupId } from './types';
import { calculateDifference } from './util/compare';
import { writeFile } from './util/write';

const compare = (baseline: CalculationsByGroupId, current: CalculationsByGroupId) => {
  /**
   * Calculate the difference between the median values of current state vs. baseline,
   * and aggregate the results per test group ("Server", "Client", "Interactions").
   */
  const allDiffs = Object.entries(current)
    .map(
      ([groupId, current]) =>
        [groupId, current, baseline[groupId]] as [string, Calculation[], Calculation[]],
    )
    .map(([groupId, current, baseline]) => ({
      [groupId]: current.map(calculateDifference(baseline)),
    }))
    .reduce((acc, val) => ({ ...acc, ...val }));

  const outputPath = 'p-current-vs-baseline.json';
  const content = JSON.stringify(allDiffs);

  /**
   * Write the result into file.
   */
  writeFile(outputPath, content, `Difference is calculated and saved to ${outputPath}!`);

  /**
   * Return the result to be passed into the ADF generator.
   */
  return allDiffs;
};

export default compare;
