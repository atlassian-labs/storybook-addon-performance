import { buildTable, buildAdf, buildTableRows } from './util/adf';
import { CalculationsByGroupId, ProcessDescription } from './types';
import { writeFile } from './util/write';

const adf = (calculationsByGroupId: CalculationsByGroupId) => {
  /**
   * Build one table + heading for each test group ("Server", "Client", "Interactions"),
   * containing measurements for current state + its baseline, and
   * the difference as a percent.
   */
  const outputTables = Object.entries(calculationsByGroupId)
    .map(([key, results]) => buildTable(key, results.map(buildTableRows)))
    .flatMap((table) => table);

  const adf = buildAdf(outputTables);

  /**
   * Write the generated ADF into file.
   */
  writeFile(ProcessDescription.ADF, 'adf', JSON.stringify(adf));
};

export default adf;
