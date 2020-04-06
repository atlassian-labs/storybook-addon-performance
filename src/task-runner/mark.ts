import { packageName } from './../addon-constants';

const startMark: string = `${packageName}-start`;
const endMark: string = `${packageName}-end`;

// This function adds a nice marker to performance dev tools
// It allows people to narrow down on the work done in a specific task
export default async function mark<T>(taskName: string, fn: () => Promise<T>): Promise<T> {
  performance.mark(startMark);
  const result: T = await fn();
  performance.mark(endMark);
  performance.measure(`🚀 (Task: ${taskName})`, startMark, endMark);
  return result;
}
