import { startAllButtonId, copySelectId, sampleSelectId, pinButtonId } from './../../src/selectors';
import { panelId } from '../../src/selectors';
import { wait } from '../custom/guards';

const getReady = (url: string) => {
  cy.visit(`${url}/?path=/story/examples--select`);
  // wait for iframe to be on the page and loaded
  cy.get('#storybook-preview-iframe[data-is-loaded="true"]');
  // After loading has completed, there's a 100ms css transition where the panel is revealed;
  // until this transition completes the addon panel still registers as "hidden"
  cy.wait(100);

  cy.get('body').then(($body) => {
    // Show the addon panel if it is currently not visible
    if (!$body.find(`#${panelId}:visible`).length) {
      return cy.get('body').type('A');
    }
  });

  // start all button should now be visible
  cy.get(`#${panelId}`).as('panel').should('be.visible');

  // Create some nice aliases
  cy.get(`#${startAllButtonId}`).as('startAllButton');
  cy.get(`#${copySelectId}`).as('copySelect');
  cy.get(`#${sampleSelectId}`).as('sampleSelect');
  cy.get(`#${pinButtonId}`).as('pinButton');

  wait.topbarEnabled();
};

export default getReady;

export const urls = ['http://localhost:9003', 'http://localhost:9004', 'http://localhost:9005'];
