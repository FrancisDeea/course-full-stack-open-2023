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

  describe('testing login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[type="text"]').type("admin")
      cy.get('input[type="password"]').type("adminadmin")
      cy.get('button[type="submit"]').click()

      cy.contains('Logged in successfully!')
    })

    it('failed with wrong credentials', function () {
      cy.get('input[type="text"]').type("noadmin")
      cy.get('input[type="password"]').type("false")
      cy.get('button[type="submit"]').click()

      cy.contains('invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})