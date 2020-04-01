import React from 'react';
function App() {
  return <div>My cool component</div>
}

export default {
  title: 'App',
};

export const app = () => <App />

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
