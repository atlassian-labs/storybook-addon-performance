import { Channel } from '@storybook/channels';
import { STORY_RENDERED } from '@storybook/core-events';
import { act, render } from '@testing-library/react';
import React from 'react';
import Panel from '../../src/panel/panel';
import * as selectors from '../../src/selectors';
import { getById } from '../../test-util/get-by';
import { assertTopbar } from '../../test-util/topbar';
import WithStorybookTheme from '../../test-util/with-storybook-theme';

it('should work correctly', () => {
  const channel: Channel = new Channel({ async: false });

  const { container } = render(
    <WithStorybookTheme>
      <Panel interactions={[]} channel={channel} />
    </WithStorybookTheme>,
  );

  // topbar starts disabled
  assertTopbar({ container, isEnabled: false });

  act(() => channel.emit(STORY_RENDERED, 'fake story'));

  // topbar now enabled
  assertTopbar({ container, isEnabled: true });

  // pin not enabled as no run has occurred yet
  expect(getById(container, selectors.pinButtonId).matches(':enabled')).toBe(false);
});
