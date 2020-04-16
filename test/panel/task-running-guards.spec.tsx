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

it('should prevent starting another task when running a task', () => {
  // 1: Initial render
  const channel: Channel = new Channel({ async: false });
  const { container, getByText } = render(
    <WithStorybookTheme>
      <Panel interactions={[]} channel={channel} />
    </WithStorybookTheme>,
  );
  // topbar starts disabled
  assertTopbar({ container, isEnabled: false });

  // 2: Story loaded
  // Pretending to render a story should enable the topbar
  act(() => channel.emit(STORY_RENDERED, mocks.storyName));
  assertTopbar({ container, isEnabled: true });
  // pin not enabled as no run has occurred yet
  expect(getById(container, selectors.pinButtonId).matches(':enabled')).toBe(false);

  // 3: Run all tasks
  const startAllButton: HTMLElement = getById(container, selectors.startAllButtonId);
  fireEvent.click(startAllButton);
  // top bar now disabled
  assertTopbar({ container, isEnabled: false });

  // 4: Run all finished
  act(() => channel.emit(eventNames.FINISH_ALL, { results: mocks.groupResults }));
  // top bar now enabled
  assertTopbar({ container, isEnabled: true });

  // 5: Run a single task
  fireEvent.click(getByText('Render to string'));
  const runSingle: HTMLElement = getByText('Run task');
  expect(runSingle.matches(':enabled')).toBe(true);
  fireEvent.click(runSingle);
  // run button now disabled
  expect(runSingle.matches(':enabled')).toBe(false);
  // top bar now disabled
  assertTopbar({ container, isEnabled: false });
  // emit a result
  const taskId: string = 'preset::unique-id:6';
  act(() =>
    channel.emit(eventNames.FINISH_ONE, {
      taskId,
      result: mocks.groupResults.map['preset::unique-id:6'],
    }),
  );
  // topbar and run button now enabled
  assertTopbar({ container, isEnabled: true });
  expect(runSingle.matches(':enabled')).toBe(true);

  // 6: Run all tasks to ensure single task button is disabled
  fireEvent.click(startAllButton);
  expect(runSingle.matches(':enabled')).toBe(false);
});
