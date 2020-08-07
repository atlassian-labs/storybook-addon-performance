import { Channel } from '@storybook/channels';
import { STORY_RENDERED } from '@storybook/core-events';
import { act, render, fireEvent } from '@testing-library/react';
import React from 'react';
import Panel from '../../src/panel/panel';
import * as selectors from '../../src/selectors';
import { getById } from '../../test-util/get-by';
import { assertTopbar } from '../../test-util/topbar';
import WithStorybookTheme from '../../test-util/with-storybook-theme';
import * as mocks from '../../test-util/mocks';
import eventNames from '../../src/events';
import client from '../../src/tasks/preset/client';
import server from '../../src/tasks/preset/server';

it('should allow filtering of tasks (client only)', () => {
  // 1: Initial render
  const channel: Channel = new Channel({ async: false });
  const { container, queryByText } = render(
    <WithStorybookTheme>
      <Panel interactions={[]} channel={channel} allowedGroups={['client']} />
    </WithStorybookTheme>,
  );

  // 2: Story loaded
  act(() => channel.emit(STORY_RENDERED, mocks.storyName));

  // 3: Run all tasks
  const startAllButton: HTMLElement = getById(container, selectors.startAllButtonId);
  fireEvent.click(startAllButton);

  // 4: Run all finished
  act(() =>
    channel.emit(eventNames.FINISH_ALL, {
      results: mocks.groupResults.filter((group) => group.groupId === client.groupId),
    }),
  );

  expect(queryByText(client.name)).toBeTruthy();
  expect(queryByText(server.name)).toBeFalsy();
});

it('should allow filtering of tasks (server only)', () => {
  // 1: Initial render
  const channel: Channel = new Channel({ async: false });
  const { container, queryByText } = render(
    <WithStorybookTheme>
      <Panel interactions={[]} channel={channel} allowedGroups={['server']} />
    </WithStorybookTheme>,
  );

  // 2: Story loaded
  act(() => channel.emit(STORY_RENDERED, mocks.storyName));

  // 3: Run all tasks
  const startAllButton: HTMLElement = getById(container, selectors.startAllButtonId);
  fireEvent.click(startAllButton);

  // 4: Run all finished
  act(() =>
    channel.emit(eventNames.FINISH_ALL, {
      results: mocks.groupResults.filter((group) => group.groupId === server.groupId),
    }),
  );

  expect(queryByText(client.name)).toBeFalsy();
  expect(queryByText(server.name)).toBeTruthy();
});
