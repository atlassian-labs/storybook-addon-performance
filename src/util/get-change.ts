// We want to get the % changed from the baseline value
// [Same]  | baseline:10 | target:10 | 0
// [Faster]| baseline:10 | target:8  | -20
// [Slower]| baseline:10 | target:12 | +20

export default function getChange({
  target,
  baseline,
}: {
  target: number;
  baseline: number;
}): number {
  const percentageOfBaseline: number = (target / baseline) * 100;
  const changeFromBaseline: number = percentageOfBaseline - 100;
  return changeFromBaseline;
}
