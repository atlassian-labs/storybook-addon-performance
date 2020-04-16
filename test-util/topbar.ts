import { getById } from './get-by';
import * as selectors from '../src/selectors';

export function assertTopbar({
  container,
  isEnabled,
}: {
  container: HTMLElement;
  isEnabled: boolean;
}) {
  expect(getById(container, selectors.startAllButtonId).matches(':enabled')).toBe(isEnabled);
  expect(getById(container, selectors.copySelectId).matches(':enabled')).toBe(isEnabled);
  expect(getById(container, selectors.sampleSelectId).matches(':enabled')).toBe(isEnabled);
}
