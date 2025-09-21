Cypress.Commands.add('login', (username = 'gelato', password = 'user') => {
  cy.visit('/auth/login')
  cy.get('input[name=username]').type(username)
  cy.get('input[name=password]').type(password)
  cy.get('form').submit()
})
