export default function getResultMap<T extends { taskName: string }>(list: T[]): Record<string, T> {
  return list.reduce((acc: Record<string, T>, item: T) => {
    acc[item.taskName] = item;
    return acc;
  }, {});
}
