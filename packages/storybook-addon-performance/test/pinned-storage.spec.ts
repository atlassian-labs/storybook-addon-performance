/* eslint-disable no-console */
import { Nullable } from '../src/types';
import { savePinned, getPinned } from '../src/panel/pinned-storage';
import * as mock from '../test-util/mocks';
import { RunContext } from '../src/panel/machine';

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
  localStorage.clear();
  // @ts-ignore
  console.warn.mockRestore();
});

it('should load supported pinned values', () => {
  const first: Nullable<RunContext> = getPinned(mock.storyName);

  expect(first).toBe(null);

  savePinned(mock.storyName, mock.runContext);
  const second: Nullable<RunContext> = getPinned(mock.storyName);

  expect(second).toEqual(mock.runContext);
  expect(console.warn).not.toHaveBeenCalled();
});

it('should not load unsupported pinned values', () => {
  const first: Nullable<RunContext> = getPinned(mock.storyName);

  savePinned(mock.storyName, { foo: 'bar' } as never);
  const second: Nullable<RunContext> = getPinned(mock.storyName);

  expect(second).toBe(null);
  expect(console.warn).toHaveBeenCalled();
});

it('should not load unsupported pinned values: old value', () => {
  const first: Nullable<RunContext> = getPinned(mock.storyName);

  const clone: RunContext = JSON.parse(JSON.stringify(mock.runContext));
  // @ts-ignore
  clone.results[0].map['Render to string'].taskId = 'unsupported old taskId';

  savePinned(mock.storyName, clone);
  const second: Nullable<RunContext> = getPinned(mock.storyName);

  expect(second).toBe(null);
  expect(console.warn).toHaveBeenCalled();
});
