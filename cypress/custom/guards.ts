function guard({ isEnabled, timeout }: { isEnabled: boolean; timeout?: number }) {
  const value = isEnabled ? 'be.enabled' : 'be.disabled';
  // use the default timeout if none is provided
  const params = timeout != null ? { timeout } : undefined;

  cy.log('custom guard start');
  // https://docs.cypress.io/api/commands/should.html#Timeouts
  // timeout here will be passed down to the '.should()'
  cy.get('@startAllButton', params).should(value);
  cy.get('@copySelect', params).should(value);
  cy.get('@sampleSelect', params).should(value);
  cy.log('custom guard end');
}

export const instant = {
  topbarEnabled: () => guard({ isEnabled: true, timeout: 0 }),
  topbarDisabled: () => guard({ isEnabled: false, timeout: 0 }),
};

export const wait = {
  topbarEnabled: () => guard({ isEnabled: true }),
  forResults: () => {
    guard({ isEnabled: false, timeout: 0 });
    // have a long wait time for tasks to finish
    guard({ isEnabled: true, timeout: 60000 });
  },
};
