import { useParameter, addons } from '@storybook/manager-api';
import { Channel } from '@storybook/channels';
import { Addon_TypesEnum } from '@storybook/types';
import { AddonPanel } from '@storybook/components';
import React from 'react';
import * as constants from './addon-constants';
import Panel from './panel/panel';
import { PublicInteractionTask, AllowedGroup } from './types';
import allowAllGroups from './tasks/allow-all-groups';

type EnvProps = {
  children: (args: {
    interactions: PublicInteractionTask[];
    channel: Channel;
    allowedGroups: AllowedGroup[];
  }) => React.ReactElement<any>;
};

// We create a wrapper to supply all of the storybook stuff so
// that we can test and display panel without needing any of it
function Env({ children }: EnvProps) {
  const parameters = useParameter(constants.paramKey, {
    interactions: [],
    allowedGroups: allowAllGroups,
  });
  const interactions: PublicInteractionTask[] = parameters.interactions || [];
  const allowedGroups: AllowedGroup[] = parameters.allowedGroups || allowAllGroups;

  const channel: Channel = addons.getChannel();
  return children({ channel: channel, interactions, allowedGroups });
}

addons.register(constants.addonKey, () => {
  addons.add(constants.panelKey, {
    type: Addon_TypesEnum.PANEL,
    title: constants.panelTitle,
    render: ({ active }) => (
      <AddonPanel active={active ?? true}>
        <Env>
          {({ interactions, channel, allowedGroups }) => (
            <Panel channel={channel} interactions={interactions} allowedGroups={allowedGroups} />
          )}
        </Env>
      </AddonPanel>
    ),
    paramKey: constants.paramKey,
  });
});
