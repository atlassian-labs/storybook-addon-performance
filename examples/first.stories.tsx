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
          name: 'test 1',
          description: 'An initial test',
          run: async (): Promise<void> => {
            return new Promise((resolve) => {
              setTimeout(() => {
                console.log('task 1 complete');
                resolve();
              });
            });
          },
        },
        {
          name: 'test 2',
          description: 'A follow-up test',
          run: async (): Promise<void> => {
            return new Promise((resolve) => {
              setTimeout(() => {
                console.log('task 2 complete');
                resolve();
              });
            });
          },
        }
      ]
    },
  },
};
