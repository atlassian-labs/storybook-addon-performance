import preset from '../../src/tasks/preset';
import { Task } from '../../src/types';
import { wait } from '../custom/guards';

const task: Task = preset[0].tasks[0];

describe('run single', () => {
  it('run all tests when asked', () => {
    // Having a larger sample so there is a bit more time for the test running
    // This will give us a longer test run (at least 10 animation frames)
    // We are doing this so we can get in to assert the disabled behaviour
    cy.get('@sampleSelect').select('10 samples').should('have.value', '10');

    cy.get('@startAllButton').click();

    wait.forResults();

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

    wait.forResults();

    // run button enabled after results
    cy.get('@runButton').should('be.enabled');
  });
});
