import { Channel } from '@storybook/channels';
import { STORY_RENDERED } from '@storybook/core-events';
import {
  background,
  color,
  convert,
  createGlobal,
  Global,
  ThemeProvider,
  themes,
  typography,
} from '@storybook/theming';
import React, { useEffect, useMemo } from 'react';
import eventNames from '../src/events';
import Panel from '../src/panel/panel';
import { savePinned } from '../src/panel/pinned-storage';
import { bindAll } from '../src/util/bind-channel-events';
import * as mocks from './mocks';

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
