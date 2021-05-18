import * as fs from 'fs';
import { Calculation, CalculationsByGroupId } from './types';
import { stdout } from './utils';

const compare = () => {
  if (process.argv.length <= 2) {
    return stdout('💔 Oh no! Please provide paths to the input files.');
  }

  const input = process.argv.slice(2);
  const categories = { '-l': 'Lite mode', '-b': 'Baseline' };
  const flags = Object.keys(categories);

  const inputPaths = input
    .map((arg, i) => (flags.includes(arg) ? { [arg]: input[i + 1] } : {}))
    .reduce((acc, val) => ({ ...acc, ...val }));

  const baselineString = fs.readFileSync(inputPaths['-b'], 'utf-8');
  const liteString = fs.readFileSync(inputPaths['-l'], 'utf-8');

  const baseline = JSON.parse(baselineString) as CalculationsByGroupId;
  const lite = JSON.parse(liteString) as CalculationsByGroupId;

  const allDiffs = Object.entries(lite)
    .map(
      ([groupId, lite]) =>
        [groupId, lite, baseline[groupId]] as [string, Calculation[], Calculation[]],
    )
    .map(([groupId, lite, baseline]) => ({
      [groupId]: lite.map(calculateDifference(baseline)),
    }))
    .reduce((acc, val) => ({ ...acc, ...val }));

  const content = JSON.stringify(allDiffs);
  stdout(content);
};

const calculateDifference = (baseline: Calculation[]) => (
  { key, ...lite }: Calculation,
  index: number,
): {
  key: string;
  diff: string;
  lite: Omit<Calculation, 'key'>;
  baseline: Omit<Calculation, 'key'>;
} => ({
  key,
  lite,
  baseline: baseline[index],
  diff: String((lite.medianValue / baseline[index].medianValue) * 100 - 100) + '%',
});

compare();
