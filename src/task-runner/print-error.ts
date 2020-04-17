/* eslint-disable no-console */
import { Task } from '../types';

export default function printError({ task, error }: { task: Task; error: any }): void {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  console.group(`🚀❌ Error in task: (${task.name})`);
  console.error(error);
  console.groupEnd();
}
