export default function flatten<T>(lists: T[][]): T[] {
  return Array.prototype.concat.apply([], lists);
}
