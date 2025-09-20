describe('Auth flow', () => {
  it('shows login page', () => {
    cy.visit('/auth/login')
    cy.contains('Log In')
  })

  it('logs in with valid credentials', () => {
    cy.login()
    cy.url().should('not.include', '/auth/login')
    cy.contains('Log Out')
  })

  it('rejects invalid credentials', () => {
    cy.visit('/auth/login')
    cy.get('input[name=username]').type('nosuchuser')
    cy.get('input[name=password]').type('wrongpass')
    cy.get('form').submit()
    cy.contains('No such user.')
  })

  it('logs out', () => {
    cy.login()
    cy.get('a[href="/auth/logout"]').click()
    cy.contains('Log Out').should('not.exist')
  })
})
