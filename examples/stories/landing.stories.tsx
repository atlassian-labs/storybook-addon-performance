import { findByText, fireEvent } from '@testing-library/dom';
import React from 'react';
import Select from 'react-select';
import invariant from 'tiny-invariant';
import {
  InteractionTaskArgs,
  PublicInteractionTask,
} from '../../packages/storybook-addon-performance/src';

export default {
  title: 'Examples',
};

const options = Array.from({ length: 1000 }, (_, k) => ({
  value: `Option ${k}`,
  label: `Option ${k}`,
}));

function SelectExample() {
  return (
    <Select
      placeholder={`Select with ${options.length} items`}
      classNamePrefix="addon"
      options={options}
      instanceId="stable"
    />
  );
}

export const select = () => <SelectExample />;

const interactionTasks: PublicInteractionTask[] = [
  {
    name: 'Display dropdown',
    description: 'Open the dropdown and wait for Option 5 to load',
    run: async ({ container, controls }: InteractionTaskArgs): Promise<void> => {
      const element: HTMLElement | null = container.querySelector('.addon__dropdown-indicator');
      invariant(element);
      fireEvent.mouseDown(element);
      await findByText(container, 'Option 5', undefined, { timeout: 20000 });
    },
  },
];

select.storyName = 'React Select';
select.parameters = {
  performance: {
    interactions: interactionTasks,
  },
};

export const noInteractions = () => <p>A story with no interactions 👋</p>;

function burnCpu() {
  const start = performance.now();
  while (performance.now() - start < 200) {}
}

function Slow() {
  burnCpu();

  return (
    <>
      A <strong>slow</strong> component
    </>
  );
}

export const slow = () => <Slow />;

export const onlyClientPerformance = () => <p>A story only measuring client-side performance 👩‍💻</p>;

onlyClientPerformance.storyName = 'Only Client';
onlyClientPerformance.parameters = {
  performance: {
    allowedGroups: ['client'],
  },
};

export const onlyServerPerformance = () => (
  <p>A story only measuring server-side performance ‍☁️</p>
);

onlyServerPerformance.storyName = 'Only Server';
onlyServerPerformance.parameters = {
  performance: {
    allowedGroups: ['server'],
  },
};
