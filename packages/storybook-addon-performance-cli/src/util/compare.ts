import { Calculation, CalculationWithDiff } from '../types';

export const calculateDifference =
  (baseline: Calculation[]) =>
  ({ key, ...current }: Calculation, index: number): CalculationWithDiff => ({
    key,
    current,
    baseline: baseline[index],
    diffPercentage: (current.medianValue / baseline[index].medianValue) * 100 - 100,
  });
