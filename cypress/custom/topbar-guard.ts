export function topbarIsEnabledGuard({ isEnabled }: { isEnabled: boolean }) {
  const value: string = isEnabled ? 'be.enabled' : 'be.disabled';

  cy.get('@startAllButton').should(value);
  cy.get('@copySelect').should(value);
  cy.get('@sampleSelect').should(value);
}
