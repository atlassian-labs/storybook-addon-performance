import {
  CalculationsByResultType,
  CalculationsByGroupId,
  ProcessDescription,
  ResultsByGroupId,
  ResultType,
} from './types';
import { performAllCalculations } from './util/calculate';
import { writeFile } from './util/write';

const calculate = (resultsByType: (ResultsByGroupId & { type: ResultType })[]) => {
  /**
   * Calculate the max, min, median, and mean values
   * of the previously formatted outputs, and group the results
   * per result type (baseline vs. current).
   */
  const calculationsByResultType = resultsByType.reduce(
    (calculationsByResultType, { type, ...resultsByGroupId }) => ({
      ...calculationsByResultType,
      [type]: Object.entries(resultsByGroupId).reduce(
        performAllCalculations,
        {} as CalculationsByGroupId,
      ),
    }),
    {} as CalculationsByResultType,
  );

  /**
   * Write the results into files –
   * one file summarises one input directory.
   */
  Object.entries(calculationsByResultType).forEach(([directoryName, output]) => {
    writeFile(ProcessDescription.Calculate, directoryName, JSON.stringify(output));
  });

  /**
   * Return the results to be compared against each other.
   */
  return calculationsByResultType;
};

export default calculate;
