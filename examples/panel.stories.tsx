import React, { useMemo, useEffect } from 'react';
import { Channel } from '@storybook/channels';
import {
  convert,
  ThemeProvider,
  themes,
  Global,
  createGlobal,
  color,
  typography,
  background,
} from '@storybook/theming';
import { STORY_RENDERED } from '@storybook/core-events';
import Panel from '../src/panel/panel';
import eventNames from '../src/events';
import { bindAll } from '../src/util/bind-channel-events';
import * as mocks from './mocks';
import { Nullable } from '../src/types';
import invariant from 'tiny-invariant';
import { savePinned } from '../src/panel/pinned-storage';

export default {
  title: 'Panel',
};

function WithStorybookTheme(props: { children: React.ReactNode }) {
  return (
    <>
      <Global styles={createGlobal({ color, typography, background })} />
      <ThemeProvider theme={convert(themes.normal)}>{props.children}</ThemeProvider>
    </>
  );
}

function ManagedPanel() {
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
  }, [channel]);

  return (
    <WithStorybookTheme>
      <Panel channel={channel} interactions={[]} />
    </WithStorybookTheme>
  );
}

export const panel = () => <ManagedPanel />;

panel.story = {
  title: 'Pinned result',
};
