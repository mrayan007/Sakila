describe('Movies Pages', () => {

  context('Browse Movies', () => {

    it('should display a list of movies', () => {
      cy.visit('/movies');
      cy.get('table').should('exist');
      cy.get('table tr').its('length').should('be.gte', 2); // header + movies
    });

    it('should allow filtering by genre', () => {
      cy.visit('/movies?genre=Action');
      cy.get('table tr').each(($row, index) => {
        if (index === 0) return;
        cy.wrap($row).find('td:nth-child(2)').invoke('text').should('contain', 'Action');
      });
    });

    it('should allow sorting by price', () => {
      cy.visit('/movies?sort=rental_rate&order=asc');

      let previous = 0;
      cy.get('table td:nth-child(5)').each(($el) => {
        const price = parseFloat($el.text().replace('$',''));
        expect(price).to.be.gte(previous);
        previous = price;
      });
    });

  });

  context('Movie Details', () => {

    it('should display a single movie page', () => {
      cy.visit('/movies/1');
      cy.get('h1').should('exist');
      cy.get('#movie-bar').should('exist');
    });
  });

  context('Error Handling', () => {

    it('should show 404 message if movie not found', () => {
      cy.visit('/movies?search=blalblsldldslfl', { failOnStatusCode: false });
      cy.contains('404').should('exist');
    });

  });

});
