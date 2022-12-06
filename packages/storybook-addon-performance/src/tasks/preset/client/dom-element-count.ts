import { Nullable, RunStaticTaskArgs, StaticTask } from '../../../types';
import { renderAndWaitForIdle } from './helpers';

function getAllChildren(container: HTMLElement): Element[] {
  return Array.from(container.querySelectorAll('*'));
}

export const domElementCount: StaticTask = {
  type: 'static',
  name: 'DOM element count',
  description: `
    The more DOM element your component creates, the more work the browser needs to do
  `,
  run: async ({ getElement, container }: RunStaticTaskArgs): Promise<string> => {
    await renderAndWaitForIdle({ getElement, container });

    const allChildren: Element[] = getAllChildren(container);

    return String(allChildren.length);
  },
};

export const domElementCountWithoutSvg: StaticTask = {
  type: 'static',
  name: 'DOM element count (no nested inline svg elements)',
  description: `
    The count of DOM elements excluding inner SVG elements
  `,
  run: async ({ getElement, container }: RunStaticTaskArgs): Promise<string> => {
    await renderAndWaitForIdle({ getElement, container });

    const allChildren: Element[] = getAllChildren(container).filter((el: Element) => {
      const parent: Nullable<Element> = el.closest('svg');

      // element not inside of a SVG: include
      if (!parent) {
        return true;
      }

      // current element is the SVG (closest can return self): include
      if (parent === el) {
        return true;
      }

      // we can exclude this one
      return false;
    });

    return String(allChildren.length);
  },
};
