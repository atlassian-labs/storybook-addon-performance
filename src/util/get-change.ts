// We want to get the % changed from the baseline value
// [Same]  | pinned:10 | result: 10 | 0
// [Faster]| pinned:10 | result: 8 | -20
// [Slower]| pinned:10 | result: 12 | +20

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
