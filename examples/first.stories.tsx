import React from 'react';

export default {
  title: 'App',
};

export const button = () => <button>Hello world</button>;

button.story = {
  parameters: {
    performance: {
      interactions: [
        {
          name: 'blah',
          run: async (): Promise<void> => {
            console.log('starting async function');
            return new Promise(resolve => {
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
