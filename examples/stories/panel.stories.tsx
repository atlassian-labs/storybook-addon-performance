import { Channel } from '@storybook/channels';
import { STORY_RENDERED } from '@storybook/core-events';
import React, { useEffect, useMemo } from 'react';
import eventNames from '../../packages/storybook-addon-performance/src/events';
import Panel from '../../packages/storybook-addon-performance/src/panel/panel';
import { savePinned } from '../../packages/storybook-addon-performance/src/panel/pinned-storage';
import { bindAll } from '../../packages/storybook-addon-performance/src/util/bind-channel-events';
import WithStorybookTheme from '../../packages/storybook-addon-performance/test-util/with-storybook-theme';
import * as mocks from '../../packages/storybook-addon-performance/test-util/mocks';
import allowAllGroups from '../../packages/storybook-addon-performance/src/tasks/allow-all-groups';

export default {
  title: 'Panel',
};

function ManagedPanel({ mode }: { mode: 'dark' | 'normal' }) {
  const channel: Channel = useMemo(() => new Channel({ async: false }), []);

  useEffect(() => {
    const unsubscribe = bindAll(channel, [
      {
        eventName: eventNames.START_ALL,
        fn: () => {
          channel.emit(eventNames.FINISH_ALL, { results: mocks.groupResults });
        },
      },
    ]);

    savePinned(mocks.storyName, mocks.runContext);

    channel.emit(STORY_RENDERED, mocks.storyName);

    return unsubscribe;
  }, [channel]);

  return (
    <WithStorybookTheme mode={mode}>
      <Panel channel={channel} interactions={[]} allowedGroups={allowAllGroups} />
    </WithStorybookTheme>
  );
}

export const light = () => <ManagedPanel mode="normal" />;
export const dark = () => <ManagedPanel mode="dark" />;
