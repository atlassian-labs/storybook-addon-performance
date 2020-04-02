import React from 'react';

export default {
  title: 'Buttons',
};

export const button = () => <button>Hello world</button>;
export const button2 = () => <button>Hello other world</button>;

button.story = {
  parameters: {
    performance: {
      interactions: [
        {
          name: 'blah',
          run: async (): Promise<void> => {
            console.log('starting async function');
            return new Promise((resolve) => {
              setTimeout(() => {
                console.log('timeout');
                resolve();
              });
            });
          },
        },
      ],
    },
  },
};
