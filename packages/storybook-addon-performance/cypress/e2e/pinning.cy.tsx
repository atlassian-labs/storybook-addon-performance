import { wait } from '../custom/guards';
import getReady, { urls } from '../support/ensure-addon-is-ready';

urls.forEach((url) => {
  describe(`Pinning results on ${url}`, () => {
    beforeEach(() => {
      getReady(url);
    });

    describe('pinning', () => {
      it('should not load a pinned result if there is none', () => {
        cy.get('@panel').should('not.contain', 'Loaded pinned result');
      });

      it('should load an available pinned result on a reload', () => {
        cy.get('@startAllButton').click();
        wait.forResults();

        // pin result
        cy.get('@pinButton').click();

        cy.reload();

        cy.get('@panel').should('contain', 'Loaded pinned result');
      });
    });
  });
});
