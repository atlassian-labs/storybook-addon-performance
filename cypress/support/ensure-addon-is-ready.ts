import { startAllButtonId, copySelectId, sampleSelectId } from './../../src/selectors';
import { panelId } from '../../src/selectors';

beforeEach(() => {
  cy.visit('/?path=/story/examples--select');
  // wait for iframe to be on the page
  cy.get('#storybook-preview-iframe');

  cy.get('body').then(($body) => {
    // Show the addon panel if it is currently not visible
    if (!$body.find(`#${panelId}:visible`).length) {
      return cy.get('body').type('A');
    }
  });

  // start all button should now be visible
  cy.get(`#${panelId}`).as('panel').should('be.visible');
  // Wait for the start all button to be enabled
  cy.get(`#${startAllButtonId}`).as('startAllButton').should('be.enabled');
  cy.get(`#${copySelectId}`).as('copySelect').should('be.enabled');
  cy.get(`#${sampleSelectId}`).as('sampleSelect').should('be.enabled');
});
