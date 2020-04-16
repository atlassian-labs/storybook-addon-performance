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

it('should prevent modifiers being changed when a result is pinned', () => {
  const channel: Channel = new Channel({ async: false });
  const { container } = render(
    <WithStorybookTheme>
      <Panel interactions={[]} channel={channel} />
    </WithStorybookTheme>,
  );
  act(() => channel.emit(STORY_RENDERED, mocks.storyName));

  fireEvent.click(getById(container, selectors.startAllButtonId));
  act(() => channel.emit(eventNames.FINISH_ALL, { results: mocks.groupResults }));

  const pinButton: HTMLElement = getById(container, selectors.pinButtonId);
  expect(pinButton.textContent.toLowerCase().includes('unpin')).toBe(false);
  fireEvent.click(pinButton);
  expect(pinButton.textContent.toLowerCase().includes('unpin')).toBe(true);

  // modifiers disabled
  expect(getById(container, selectors.sampleSelectId).matches(':enabled')).toBe(false);
  expect(getById(container, selectors.copySelectId).matches(':enabled')).toBe(false);
  // run all button still active
  expect(getById(container, selectors.startAllButtonId).matches(':enabled')).toBe(true);

  // unpinning re-enables the modifiers
  fireEvent.click(pinButton);
  expect(pinButton.textContent.toLowerCase().includes('unpin')).toBe(false);
  expect(getById(container, selectors.sampleSelectId).matches(':enabled')).toBe(true);
  expect(getById(container, selectors.copySelectId).matches(':enabled')).toBe(true);
});
