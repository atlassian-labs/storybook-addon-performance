import { startAllButtonId, panelId, sampleSelectId } from '../../src/selectors';
import preset from '../../src/tasks/preset';
import { Task, TaskGroup } from '../../src/types';
import flatten from '../../src/util/flatten';

const task: Task = preset[0].tasks[0];

describe('run single', () => {
  it('run all tests when asked', () => {
    // Having a larger sample so there is a bit more time for the test running
    // This will give us a longer test run (at least 10 animation frames)
    // We are doing this so we can get in to assert the disabled behaviour
    cy.get(`#${sampleSelectId}`).select('10 samples').should('have.value', '10');

    // start all tests
    cy.get(`#${startAllButtonId}`).click();

    // button will be enabled at the end of the tasks
    cy.get(`#${startAllButtonId}:enabled`);

    // description hidden in expand section

    cy.get('@panel')
      .contains(task.name)
      .closest('button')
      .should('match', '[aria-expanded="false"]')
      .as('toggle')
      .click()
      .should('match', '[aria-expanded="true"]');

    // First run: checking that the run button is disabled
    cy.get('@panel')
      .contains('Run task')
      .as('runButton')
      .should('be.enabled')
      .click()
      .should('be.disabled');

    // Second run: checking the topbar is disabled
    cy.get('@runButton').should('be.enabled').click();
    cy.get(`#${startAllButtonId}`).should('be.disabled');
  });
});
