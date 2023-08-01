
describe('Note app', () => {

  beforeEach( () => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'matti Luukkainen',
      username: 'mluukkai',
      password: 'woah'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, Jack Porter 2023')
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })

  it('user can login', () => {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('woah')
    cy.get('#login-button').click()

    cy.contains('matti Luukkainen logged in')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'mluukkai', password: 'woah' })
    })

    it('a new note can be created', () => {
      cy.contains('new note').click()
      cy.contains('Create a new Note')
      cy.get('#note-content').type('a test note')
      cy.contains('save').click()
      cy.contains('a test note')
    })

    describe('and several notes exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'a test note', important: true })
        cy.createNote({ content: 'a second test note', important: false })
        cy.createNote({ content: 'a third test note', important: false })
      })

      it('one can be made not important', () => {
        cy.contains('a test note').find('button').as('theButton')
        cy.get('@theButton').click()

        cy.get('@theButton').should('contain', 'make important')
      })
      it('one can be made important', () => {
        cy.contains('a second test note').find('button').as('theButton')
        cy.get('@theButton').click()

        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

  it('login fails with wrong password', () => {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error').should('contain', 'Wrong Credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'matti Luukkainen logged in')
  } )
})