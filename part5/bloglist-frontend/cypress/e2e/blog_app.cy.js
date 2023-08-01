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

  describe.only('when user is logged', function () {
    beforeEach(function () {
      cy.login({username: "admin", password: "adminadmin"})
    })

    it('user can create a new blog', function () {
      cy.contains(/create new blog/i).click()
      cy.get('input[name="title"]').type('E2E title')
      cy.get('input[name="author"]').type('E2E author')
      cy.get('input[name="url"]').type('E2E url')
      cy.get('button[type="submit"]').click()

      cy.get('.notification')
        .should('contain', 'A new blog was created')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.blogDiv').contains('E2E title')
    })
  })
})