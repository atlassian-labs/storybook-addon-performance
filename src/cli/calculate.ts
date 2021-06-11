import type { Calculation, Results, ResultsByGroupId, ResultType } from './types';
import { ProcessDescription } from './types';
import { performCalculations } from './util/calculate';
import { writeFile } from './util/write';

const calculate = (resultsByType: (ResultsByGroupId & { type: ResultType })[]) => {
  /**
   * Calculate the max, min, median, and mean values
   * of the previously formatted outputs, and group the results
   * per result type (baseline vs. current).
   */
  const calculationsByResultType = Object.fromEntries(
    resultsByType
      .map(({ type, ...resultsByGroupId }) => [type, resultsByGroupId])
      .map(([type, resultsByGroupId]) => [type, Object.entries(resultsByGroupId)])
      .map((entry) => entry as [ResultType, [string, Results][]])
      .map(([type, resultByGroupId]) => [
        type,
        // This is where we actually perform the calculations, the rest of the mapping is
        // purely to dig deep into the structure so we can extract the result out since they're grouped first
        // by type (current vs. baseline) then by group id ("Server", "Client", "Interactions").
        resultByGroupId.map(([groupId, result]) => [groupId, performCalculations(result)]),
      ])
      .map((entry) => entry as [ResultType, [string, Calculation[]][]])
      .map(([type, calculationsByGroupId]) => [type, Object.fromEntries(calculationsByGroupId)]),
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
