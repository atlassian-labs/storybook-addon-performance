import React from 'react';
import { StaticTask, TimedTask, TimedResult, ErrorResult } from '../../src/types';
import { runOneTimed } from '../../src/task-runner';
import { createElement, useEffect } from 'react';
import ReactDOM from 'react-dom';

it('should remove a container after usage', async () => {
  let pointer: HTMLElement | null = null;
  const task: TimedTask = {
    type: 'timed',
    description: 'task',
    name: 'task',
    run: async ({ container }): Promise<void> => {
      pointer = container;
    },
  };

  expect(pointer).toBe(null);

  const results: TimedResult | ErrorResult = await runOneTimed({
    task,
    getNode: () => null,
    copies: 1,
    samples: 1,
  });

  expect(results.type).toBe('timed');
  expect(pointer).toBeInstanceOf(HTMLElement);
  // now removed
  expect(document.body.contains(pointer)).toBe(false);
});

it('should not error if the container was already removed from the DOM', async () => {
  let pointer: HTMLElement | null = null;
  const task: TimedTask = {
    type: 'timed',
    description: 'task',
    name: 'task',
    run: async ({ container }): Promise<void> => {
      pointer = container;
      document.body.removeChild(container);
    },
  };

  expect(pointer).toBe(null);

  const results: TimedResult | ErrorResult = await runOneTimed({
    task,
    getNode: () => null,
    copies: 1,
    samples: 1,
  });

  expect(results.type).toBe('timed');
  expect(pointer).toBeInstanceOf(HTMLElement);
  // now removed
  expect(document.body.contains(pointer)).toBe(false);
});

it('should unmount any mounted react applications in the container', async () => {
  const actions: Array<string> = [];
  function App() {
    useEffect(() => {
      actions.push('mounted');
      return () => {
        actions.push('unmounted');
      };
    });
    actions.push('rendered');

    return <div>Hello world</div>;
  }
  const task: TimedTask = {
    type: 'timed',
    description: 'task',
    name: 'task',
    run: async ({ container, getElement }): Promise<void> => {
      ReactDOM.render(getElement(), container);
    },
  };

  expect(actions).toEqual([]);

  const results: TimedResult | ErrorResult = await runOneTimed({
    task,
    getNode: () => <App />,
    copies: 1,
    samples: 1,
  });

  expect(results.type).toBe('timed');
  expect(actions).toEqual(['rendered', 'mounted', 'unmounted']);
});

it('should unmount any detached applications', async () => {
  const actions: Array<string> = [];
  function App() {
    useEffect(() => {
      actions.push('mounted');
      return () => {
        actions.push('unmounted');
      };
    });
    actions.push('rendered');

    return <div>Hello world</div>;
  }
  const task: TimedTask = {
    type: 'timed',
    description: 'task',
    name: 'task',
    run: async ({ container, getElement }): Promise<void> => {
      ReactDOM.render(getElement(), container);
      // detached but not unmounted
      document.body.removeChild(container);
    },
  };

  expect(actions).toEqual([]);

  const results: TimedResult | ErrorResult = await runOneTimed({
    task,
    getNode: () => <App />,
    copies: 1,
    samples: 1,
  });

  expect(results.type).toBe('timed');
  expect(actions).toEqual(['rendered', 'mounted', 'unmounted']);
});
