import React from 'react';
import ReactDOMServer from 'react-dom/server';
import assert from 'assert';
import { StaticTask } from '../../../types';
import { UnsupportedError } from '../../../task-runner/custom-errors';
import { render as reactRender, hydrate as reactHydrate } from '../../../util/react';
import MeasureLab from '../../../util/measure-lab';
import { Deferred } from '../../../util/deferred';
import debounce from '../../../util/debounce';
import waitForIdle from '../../../util/wait-for-idle';
import { formatTime, RENDER_WAIT_TIMEOUT } from './helpers';

export const render: StaticTask = {
  type: 'static',
  name: 'Initial render',
  description: `
      This task records how long the initial rendering takes,
      including the subsequent effects causing a rerender with any DOM changes.
  `,
  run: async ({ getElement, container }) => {
    const task = new Deferred<string>();
    const debouncedFinish = debounce(task.resolve, RENDER_WAIT_TIMEOUT);
    let startTime: number = 0;

    function measure(): void {
      const result = formatTime(performance.now() - startTime);
      debouncedFinish(result);
    }

    startTime = performance.now();
    await reactRender(
      <MeasureLab Subject={getElement} onRender={measure} onMutation={measure} />,
      container,
    );

    return task.promise;
  },
};

export const hydrate: StaticTask = {
  type: 'static',
  name: 'Hydrate',
  description: `
      This task records how long React hydration takes, including the subsequent effects
      causing a rerender with any DOM changes. If you are server side rendering a React
      component then html is sent down to the browser. Hydration is the process of React
      reading through the HTML and building up it's internal virtual model. After hydration
      React is able to take over the HTML as if it had done the original render on the client.
  `,
  run: async ({ getElement, container }) => {
    // Not using ReactDOM.render so that React cannot cache the result
    const html: string = ReactDOMServer.renderToString(<MeasureLab Subject={getElement} />);
    container.innerHTML = html;

    await waitForIdle();

    const task = new Deferred<string>();
    const debouncedFinish = debounce(task.resolve, RENDER_WAIT_TIMEOUT);
    let startTime: number = 0;

    function measure(): void {
      const result = formatTime(performance.now() - startTime);
      debouncedFinish(result);
    }

    startTime = performance.now();
    await reactHydrate(
      <MeasureLab Subject={getElement} onRender={measure} onMutation={measure} />,
      container,
    );

    return task.promise;
  },
};

export const reRender: StaticTask = {
  type: 'static',
  name: 'Re render',
  description: `
      This task records how long it takes to re-render the component with no prop changes.
      Note: You can improve this score quickly by using React.memo near the top of your
      component tree.
  `,
  run: async ({ getElement, container }) => {
    const task = new Deferred<string>();
    const renderFinish = new Deferred<void>();
    const debouncedFinish = debounce(task.resolve, RENDER_WAIT_TIMEOUT);
    const debouncedRenderFinish = debounce(renderFinish.resolve, RENDER_WAIT_TIMEOUT);
    let startTime: number = 0;
    let forceRender: (() => void) | null = null;
    let isRendered = false;

    function measure(): void {
      if (!isRendered) {
        debouncedRenderFinish();
        return;
      }

      const result = formatTime(performance.now() - startTime);
      debouncedFinish(result);
    }

    await reactRender(
      <MeasureLab
        Subject={getElement}
        onRender={measure}
        onMutation={measure}
        onForceRenderReady={(cb) => (forceRender = cb)}
      />,
      container,
    );

    await renderFinish.promise;

    await waitForIdle();

    isRendered = true;
    assert(forceRender);

    startTime = performance.now();
    forceRender!();

    return task.promise;
  },
};

export const completeRender: StaticTask = {
  type: 'static',
  name: 'Complete render (mount + layout + paint)',
  description: `
    Time taken for the CPU to become idle after the rendering has started.
    This will include React's time to create the element and mount
    it into the DOM including the consequent effects causing a rerender
    with any DOM changes, as well as subsequent browser layout and painting.
  `,
  run: async ({ getElement, container }) => {
    const idle = (window as any).requestIdleCallback;
    const cancelIdle = (window as any).cancelIdleCallback;
    let idleCallbackId: number;

    if (typeof idle !== 'function') {
      throw new UnsupportedError('requestIdleCallback is not supported in this browser');
    }

    const task = new Deferred<string>();
    const debouncedFinish = debounce(task.resolve, RENDER_WAIT_TIMEOUT);
    let startTime: number = 0;

    function measure(fromIdle = false): void {
      const result = formatTime(performance.now() - startTime);
      debouncedFinish(result);

      if (fromIdle) {
        return;
      }

      // Request idle callback on every render-like event to capture the time of the last idleness
      cancelIdle(idleCallbackId);
      idleCallbackId = idle(() => measure(true));
    }

    startTime = performance.now();
    await reactRender(
      <MeasureLab Subject={getElement} onRender={measure} onMutation={measure} />,
      container,
    );

    return task.promise;
  },
};
