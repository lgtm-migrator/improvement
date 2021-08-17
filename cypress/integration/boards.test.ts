import { createRandomUser } from '../support/helpers'

describe('boards', () => {
    const testuser = createRandomUser()

    before(() => {
        cy.visit('/')

        cy.signup(testuser)
        cy.location('pathname').should('equal', '/dashboard')
    })

    it('should create a new board', () => {
        cy.contains('button', 'New Board').click()

        cy.get('input[name="board"]').type('test board')

        cy.contains('button', 'Create').click()

        cy.contains('div', 'test board')
    })

    it('should have a disabled Create button when input is empty', () => {
        cy.contains('button', 'New Board').click()

        cy.contains('button', 'Create').should('be.disabled')
    })

    it('should remove modal when pressing cancel', () => {
        cy.contains('button', 'Cancel').click()
    })
})

export {}
