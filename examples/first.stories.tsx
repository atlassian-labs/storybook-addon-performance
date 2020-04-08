import { findByText, fireEvent } from '@testing-library/dom';
import React from 'react';
import Select from 'react-select';
import invariant from 'tiny-invariant';
import { InteractionTaskArgs, Nullable } from '../src/types';

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

select.story = {
  name: 'React select',
  parameters: {
    performance: {
      interactions: [
        {
          name: 'Select item',
          run: async ({ container, controls }: InteractionTaskArgs): Promise<void> => {
            const element: Nullable<HTMLElement> = container.querySelector(
              '.addon__dropdown-indicator',
            );
            invariant(element);
            fireEvent.mouseDown(element);
            await findByText(document.body, 'option 5', undefined, { timeout: 20000 });
          },
        },
      ],
    },
  },
};
