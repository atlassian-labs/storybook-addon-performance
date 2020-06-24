import { addDecorator } from '@storybook/react';
import { addParameters } from '@storybook/client-api';
import { withPerformance } from '../src';

addDecorator(withPerformance);
