// We want to get the % changed from the baseline value
// [Same]  | baseline:10 | value:10 | 0
// [Faster]| baseline:10 | value:8  | -20
// [Slower]| baseline:10 | value:12 | +20

export default function getChange({
  value,
  baseline,
}: {
  value: number;
  baseline: number;
}): number {
  const percentageOfBaseline: number = (value / baseline) * 100;
  const changeFromBaseline: number = percentageOfBaseline - 100;
  return changeFromBaseline;
}
