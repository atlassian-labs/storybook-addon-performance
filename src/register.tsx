import { addons, types } from '@storybook/addons';
import { useParameter } from '@storybook/api';
import { Channel } from '@storybook/channels';
import { AddonPanel } from '@storybook/components';
import React from 'react';
import * as constants from './addon-constants';
import Panel from './panel/panel';
import { PublicInteractionTask, AllowedGroup } from './types';
import { defaultAllowedGroups } from './tasks/preset';

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
    allowedGroups: defaultAllowedGroups,
  });
  const interactions: PublicInteractionTask[] = parameters.interactions || [];
  const allowedGroups = parameters.allowedGroups || defaultAllowedGroups;

  // sadly need to add cast for storybook ts-loader
  const channel: Channel = addons.getChannel() as any;
  return children({ channel: channel as any, interactions, allowedGroups });
}

addons.register(constants.addonKey, () => {
  addons.add(constants.panelKey, {
    type: types.PANEL,
    title: constants.panelTitle,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
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
