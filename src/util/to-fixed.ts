export default function toFixed(value: number, precision: number = 2): number {
  return Number(value.toFixed(precision));
}
