import invariant from 'tiny-invariant';
import { Nullable } from '../src/types';

export function getBySelector(container: HTMLElement, selector: string): HTMLElement {
  const el: Nullable<HTMLElement> = container.querySelector(selector);
  invariant(el, `Could not find element for selector ${selector}`);
  return el;
}

export function getById(container: HTMLElement, id: string): HTMLElement {
  return getBySelector(container, `#${id}`);
}
