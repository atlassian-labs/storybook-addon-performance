import { startAllButtonId } from '../../src/selectors';
import preset from '../../src/tasks/preset';
import { Task, TaskGroup } from '../../src/types';
import flatten from '../../src/util/flatten';
import { topbarIsEnabledGuard } from '../custom/topbar-guard';

describe('run all', () => {
  it('run all tests when asked', () => {
    topbarIsEnabledGuard({ isEnabled: true });
    // start the tasks
    cy.get('@startAllButton').click();

    topbarIsEnabledGuard({ isEnabled: false });

    // topbar will be enabled when task is done
    topbarIsEnabledGuard({ isEnabled: true });

    preset.forEach((group: TaskGroup) => {
      cy.get('@panel').should('contain', group.name);
    });

    flatten(preset.map((group: TaskGroup) => group.tasks)).forEach((task: Task) => {
      cy.get('@panel')
        // needs to have an expanding section for each task
        .contains(task.name)
        .closest('button')
        // initially collapsed
        .should('match', '[aria-expanded="false"]');
    });
  });
});
