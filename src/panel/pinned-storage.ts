import { RunContext } from './machine';
import { packageName } from '../addon-constants';
import { Nullable, TaskGroupResult, Combine, TaskGroup } from '../types';

function upgrade(context: RunContext): Nullable<RunContext> {
  if (!context.results) {
    return context;
  }

  // Changed TaskGroup.groupName to TaskGroup.groupId
  return {
    ...context,
    results: context.results.map(
      (result: any): TaskGroupResult => {
        if (result.groupName) {
          return {
            groupId: result.groupName,
            map: result.map,
          };
        }
        return result;
      },
    ),
  };
}

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

  return upgrade(JSON.parse(raw));
}
