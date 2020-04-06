export default function toResultMap<T extends { taskId: string }>(list: T[]): Record<string, T> {
  return list.reduce((acc: Record<string, T>, item: T) => {
    acc[item.taskId] = item;
    return acc;
  }, {});
}
