describe('Testing E2E Blog app', function () {
  beforeEach(function () {
    cy.request('POST', "http://localhost:3000/api/testing/restart")

    const user = {
      "username": "admin",
      "name": "administrador",
      "password": "adminadmin"
    }

    cy.request('POST', 'http://localhost:3000/api/users', user)

    cy.visit('http://localhost:3000')
  })
})