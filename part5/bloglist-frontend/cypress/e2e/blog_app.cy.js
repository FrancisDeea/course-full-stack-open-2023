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

  describe('when user is logged', function () {
    beforeEach(function () {
      cy.login({ username: "admin", password: "adminadmin" })
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

  describe('when a blog was created for user', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'adminadmin' })
      cy.createBlog({ title: "E2E title", author: "E2E author", url: "E2E url" })
    })

    it('user can like a blog', function () {
      cy.contains(/e2e title/i)
        .parent()
        .find('button')
        .click()

      cy.contains(/likes: 0/)

      cy.get('.likeButton').click()
      cy.contains(/likes: 1/)
    })

    it('owner of blog can delete it', function () {
      cy.contains(/e2e title/i)
        .parent()
        .find('button')
        .click()

      cy.get('.deleteButton').click()
      cy.get('html').should('not.contain', /e2e title/i)
    })

    it('random user cannot delete a blog if it is not his own', function () {
      cy.get('html').contains(/logout/i).click()

      const user = {
        "username": "anotherUser",
        "name": "another",
        "password": "adminadmin"
      }

      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
      cy.login({ username: "anotherUser", password: "adminadmin" })

      cy.contains(/e2e title/i)
        .parent()
        .find('button').click()
        .parent()
        .get('.deleteButton')
        .should('not.exist')
    })
  })

  describe.only('when more than one blog were created', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'adminadmin' })
      cy.createBlog({ title: "E2E title", author: "E2E author", url: "E2E url" })
      cy.createBlog({ title: "E2E title 2", author: "E2E author 2", url: "E2E url 2" })
    })

    it('the blogs with the most likes are sorted in descending order', function () {
      cy.get('.blogDiv').eq(0).find('button').click().parent().get('.likeButton').click().parent().contains(/hide/i).click()
      cy.get('.blogDiv').eq(1).find('button').click().parent().get('.likeButton').click().wait(500).click().parent().contains(/hide/i).click()

      cy.get('.blogDiv').eq(0).contains(/e2e title 2/i)
    })
  })
})