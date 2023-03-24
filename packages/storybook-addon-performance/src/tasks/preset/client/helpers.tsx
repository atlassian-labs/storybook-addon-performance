import React from 'react';
import { render as reactRender } from '../../../util/react';
import { Deferred } from '../../../util/deferred';
import debounce from '../../../util/debounce';
import MeasureLab from '../../../util/measure-lab';
import waitForIdle from '../../../util/wait-for-idle';
import { RunStaticTaskArgs } from '../../../types';

export const RENDER_WAIT_TIMEOUT = 1000;

export async function renderAndWaitForIdle({ getElement, container }: RunStaticTaskArgs) {
  const task = new Deferred();
  const debouncedFinish = debounce(task.resolve as () => void, RENDER_WAIT_TIMEOUT);

  await reactRender(
    <MeasureLab Subject={getElement} onRender={debouncedFinish} onMutation={debouncedFinish} />,
    container,
  );

  debouncedFinish();
  await task.promise;

  await waitForIdle();
}

export function formatTime(milliseconds: number): string {
  return `${Math.round(milliseconds)} ms`;
}
