import { addDecorator } from '@storybook/react';
import { addParameters } from '@storybook/client-api';
import { withPerformance } from '../src';
import { defaultAllowedGroups } from '../src/tasks/preset';

addParameters({
  performance: {
    allowedGroups: defaultAllowedGroups,
  },
});

addDecorator(withPerformance);
