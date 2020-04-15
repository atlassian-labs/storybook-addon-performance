import { RunContext } from './machine';
import { packageName } from '../addon-constants';
import { Nullable, TaskGroupResult, Combine } from '../types';

function getKey(storyName: string) {
  return `${packageName}-${storyName}`;
}

export function savePinned(storyName: string, results: RunContext) {
  localStorage.setItem(getKey(storyName), JSON.stringify(results));
}

export function clearPinned(storyName: string) {
  localStorage.removeItem(getKey(storyName));
}

export function getPinned(storyName: string): Nullable<RunContext> {
  const raw: Nullable<string> = localStorage.getItem(getKey(storyName));

  if (!raw) {
    return null;
  }

  return JSON.parse(raw);
}
