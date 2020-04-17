import { Task, ErrorResult } from '../types';
import { UnsupportedError } from './custom-errors';

export default function getErrorResult({ task, error }: { task: Task; error: any }): ErrorResult {
  if (error instanceof UnsupportedError) {
    return {
      type: 'error',
      taskId: task.taskId,
      reason: 'unsupported',
      message: error.message,
    };
  }
  return {
    type: 'error',
    taskId: task.taskId,
    reason: 'unhandled',
    message: null,
  };
}
