export default function toResultMap<T extends { taskName: string }>(list: T[]): Record<string, T> {
  return list.reduce((acc: Record<string, T>, item: T) => {
    acc[item.taskName] = item;
    return acc;
  }, {});
}
