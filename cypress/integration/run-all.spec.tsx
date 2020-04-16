import { startAllButtonId } from '../../src/selectors';
import preset from '../../src/tasks/preset';
import { Task, TaskGroup } from '../../src/types';
import flatten from '../../src/util/flatten';

describe('run all', () => {
  it('run all tests when asked', () => {
    cy.get(`#${startAllButtonId}`)
      // enabled to start
      .should('be.enabled')
      // start the tasks
      .click()
      // start button should be disabled
      .should('be.disabled');

    // button will be enabled at the end of the tasks
    cy.get(`#${startAllButtonId}:enabled`);

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
