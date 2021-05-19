import { Calculation, CalculationWithDiff } from '../types';

export const calculateDifference = (baseline: Calculation[]) => (
  { key, ...lite }: Calculation,
  index: number,
): CalculationWithDiff => ({
  key,
  lite,
  baseline: baseline[index],
  diffPercentage: (lite.medianValue / baseline[index].medianValue) * 100 - 100,
});
