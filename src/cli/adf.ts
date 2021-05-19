import { buildTable, buildAdf, buildTableRows } from './util/adf';
import { CalculationsByGroupId } from './types';
import { writeFile } from './util/write';

const adf = (calculationsByGroupId: CalculationsByGroupId) => {
  /**
   * Build one table + heading for each test group ("Server", "Client", "Interactions"),
   * containing measurements for lite mode + its baseline, and
   * the difference as a percent.
   */
  const outputTables = Object.entries(calculationsByGroupId)
    .map(([key, results]) => buildTable(key, results.map(buildTableRows)))
    .flatMap((table) => table);

  const adf = buildAdf(outputTables);

  const outputPath = 'p-adf.json';
  const content = JSON.stringify(adf);

  /**
   * Write the generated ADF into file.
   */
  writeFile(outputPath, content, `Generated ADF is saved to ${outputPath}!`);
};

export default adf;
