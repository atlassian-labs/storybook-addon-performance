import React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import Panel from './panel/panel';
import * as constants from './addon-constants';

addons.register(constants.addonKey, () => {
  addons.add(constants.panelKey, {
    type: types.PANEL,
    title: constants.panelTitle,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        {/* sadly need to add cast for storybook ts-loader */}
        <Panel channel={addons.getChannel() as any} />
      </AddonPanel>
    ),
    paramKey: constants.paramKey,
  });
});
