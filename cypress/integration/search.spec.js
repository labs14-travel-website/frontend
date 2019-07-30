context('Destinations Search Bar', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('tests true', () => {
        expect(true).to.equal(true);
    });

    it('looks for input field', () => {
        cy.get('.search').should(
            'contain',
            'Roam',
        );
    });

    it('Type into the input field', () => {
        cy.get('input[placeholder=Destination]').type('Hawaii').type('{enter}');
        cy.get('.destinations').should('contain', 'The test server is up and running!');
    });
});



