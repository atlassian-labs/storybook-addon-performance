import { startAllButtonId } from '../../src/selectors';
import getPresets from '../../src/tasks/preset';
import { Task, TaskGroup } from '../../src/types';
import flatten from '../../src/util/flatten';
import { wait } from '../custom/guards';

const preset = getPresets({ clientOnly: false });

describe('run all', () => {
  it('be able to run all tasks', () => {
    // start the tasks
    cy.get('@startAllButton').click();

    // topbar will be enabled when task is done
    wait.forResults();

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
