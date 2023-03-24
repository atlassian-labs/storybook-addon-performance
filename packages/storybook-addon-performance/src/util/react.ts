import { version } from 'react';
import ReactDOM from 'react-dom';
import type * as ReactDOMClientType from 'react-dom/client';

export const IS_REACT_18_AND_NEWER = Number(version.split('.')[0]) >= 18;

const REACT_ROOT_KEY = '_addon_performance_root';

// Import (React 18 specific) react-dom/client conditionally to avoid build-time errors when using older versions
let ReactDOMClient: typeof ReactDOMClientType = {} as any;
if (IS_REACT_18_AND_NEWER) {
  ReactDOMClient = require.context('react-dom', true, /client.js$/)('./client.js');
}

export async function render(element: React.ReactElement, container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    if (!IS_REACT_18_AND_NEWER) {
      ReactDOM.render(element, container, resolve);
      return;
    }

    const { createRoot } = ReactDOMClient;
    const root = createRoot(container);
    root.render(element);

    (container as any)[REACT_ROOT_KEY] = root;

    resolve();
  });
}

export async function hydrate(element: React.ReactElement, container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    if (!IS_REACT_18_AND_NEWER) {
      ReactDOM.hydrate(element, container, resolve);
      return;
    }

    const { hydrateRoot } = ReactDOMClient;
    const root = hydrateRoot(container, element);

    (container as any)[REACT_ROOT_KEY] = root;

    resolve();
  });
}

export function unmountRootAtContainer(container: HTMLElement): void {
  if (!IS_REACT_18_AND_NEWER) {
    ReactDOM.unmountComponentAtNode(container);
  } else {
    (container as any)[REACT_ROOT_KEY]?.unmount();
  }
}
