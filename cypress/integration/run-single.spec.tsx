import preset from '../../src/tasks/preset';
import { Task } from '../../src/types';
import { topbarIsEnabledGuard } from '../custom/topbar-guard';

const task: Task = preset[0].tasks[0];

describe('run single', () => {
  it('run all tests when asked', () => {
    // Having a larger sample so there is a bit more time for the test running
    // This will give us a longer test run (at least 10 animation frames)
    // We are doing this so we can get in to assert the disabled behaviour
    cy.get('@sampleSelect').select('10 samples').should('have.value', '10');

    cy.get('@startAllButton')
      // start all tests
      .click()
      // button now disabled
      .should('be.disabled');

    // Finished running: when the button to become enabled again
    cy.get('@startAllButton').should('be.enabled');

    // Task is currently closed
    cy.get('@panel')
      .contains(task.name)
      .closest('button')
      .should('match', '[aria-expanded="false"]')
      .as('toggle')
      // expand the task
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
    topbarIsEnabledGuard({ isEnabled: true });
    cy.get('@runButton').should('be.enabled').click();
    // topbar disabled while task is running
    topbarIsEnabledGuard({ isEnabled: false });
    // topbar enabled when task is finished
    topbarIsEnabledGuard({ isEnabled: true });
  });
});
