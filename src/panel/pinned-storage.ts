import { RunContext } from './machine';
import { packageName } from '../addon-constants';
import type { Nullable, ResultMap } from '../types';

function hasProperty(value: Record<string, any>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function isValidContext(value: unknown): value is RunContext {
  if (typeof value !== 'object') {
    return false;
  }
  if (value == null) {
    return false;
  }
  if (Array.isArray(value)) {
    return false;
  }

  // Duck typing:
  const hasAllProperties: boolean = ['results', 'samples', 'copies'].every((key) =>
    hasProperty(value, key),
  );

  if (!hasAllProperties) {
    return false;
  }

  // Now going to get any result and ensure it doesn't have a 'taskId'
  // if it does have a taskId then the entry is out of date
  const map: ResultMap | undefined =
    // @ts-ignore
    value && value.results && value.results[0] ? value.results[0].map : undefined;

  if (map == null) {
    return false;
  }

  const hasTaskId: boolean = Object.keys(map).some((key) => {
    const entry = map[key];
    return hasProperty(entry, 'taskId');
  });

  return hasTaskId ? false : true;
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

  const value: any = JSON.parse(raw);
  if (!isValidContext(value)) {
    // eslint-disable-next-line no-console
    console.warn('Unsupported value found in localStorage. Value cleared');
    clearPinned(storyName);
    return null;
  }

  return value;
}
