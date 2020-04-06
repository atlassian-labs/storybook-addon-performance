import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import TaskHarness from './task-harness';
import * as constants from '../addon-constants';

export default makeDecorator({
  name: constants.decoratorKey,
  parameterName: constants.paramKey,
  // We are enabling the addon fo r all stories
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    // Sadly need to add cast for storybook ts-loader
    return <TaskHarness getNode={() => getStory(context)} channel={addons.getChannel() as any} />;
  },
});
