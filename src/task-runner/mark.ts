import { addonKey } from './../addon-constants';

const startMark: string = `storybook-addon-${addonKey}-start`;
const endMark: string = `storybook-addon-${addonKey}-end`;

export default async function mark<T>(
  taskName: string,
  fn: () => Promise<T>,
): Promise<T> {
  performance.mark(startMark);
  const result: T = await fn();
  performance.mark(endMark);
  performance.measure(`🚀 (${taskName})`, startMark, endMark);
  return result;
}
