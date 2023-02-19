import { StorybookConfig } from '@storybook/react-vite';

const conifg: StorybookConfig = {
  stories: ['../stories/*.stories.*'],
  addons: ['storybook-addon-performance'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default conifg;
