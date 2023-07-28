describe('Testing E2E Blog app', function () {
  beforeEach(function () {
    cy.request('POST', "http://localhost:3003/api/testing/restart")

    const user = {
      "username": "admin",
      "name": "administrador",
      "password": "adminadmin"
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.get('input[type="text"]')
    cy.get('input[type="password"]')
    cy.get('button[type="submit"]').contains(/log in/i)
  })
})