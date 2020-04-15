describe('run all', () => {
  beforeEach(() => {
    cy.visit('/?path=/story/examples--select');
  });
  it('should be awesome', () => {
    expect(true).to.eq(true);
  });
});
