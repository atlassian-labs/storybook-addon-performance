function guard({ isEnabled, timeout }: { isEnabled: boolean; timeout?: number }) {
  const value = isEnabled ? 'be.enabled' : 'be.disabled';
  // use the default timeout if none is provided
  const params = timeout != null ? { timeout } : undefined;

  cy.get('@startAllButton').should(value, params);
  cy.get('@copySelect').should(value, params);
  cy.get('@sampleSelect').should(value, params);
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
