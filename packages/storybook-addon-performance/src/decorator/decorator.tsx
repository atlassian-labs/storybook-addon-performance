import React, { ReactNode } from 'react';
import { addons, makeDecorator } from '@storybook/preview-api';
import TaskHarness from './task-harness';
import { PublicInteractionTask, AllowedGroup } from '../types';
import * as constants from '../addon-constants';
import allowAllGroups from '../tasks/allow-all-groups';

export default makeDecorator({
  name: constants.decoratorKey,
  parameterName: constants.paramKey,
  // We are enabling the addon for all stories
  // 'Interactions' need to be provided by consumers
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const interactions: PublicInteractionTask[] = (parameters && parameters.interactions) || [];
    const allowedGroups: AllowedGroup[] =
      (parameters && parameters.allowedGroups) || allowAllGroups;

    return (
      <TaskHarness
        getNode={() => getStory(context) as ReactNode}
        channel={addons.getChannel()}
        interactions={interactions}
        allowedGroups={allowedGroups}
      />
    );
  },
});
