context('Destinations Search Bar', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('looks for input field', () => {
    cy.get('button[class^="Search_Search__form__submit"]').should(
      'contain',
      'Roam',
    );
  });

  it('Type into the input field', () => {
    cy.get('input[class^="Search_Search__form__input"]').type('Hawaii').type('{enter}');
    // cy.get('input[class^="Search_Search__form__input"]').should('contain', '');
    // cy.get('.destinations').should('contain', 'The test server is up and running!');
  });
});
