import { createRandomUser } from '../support/helpers'

describe('index page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should go to the sign up page', () => {
        cy.contains('a', 'Sign Up').click()
        cy.location('pathname').should('equal', '/signup')
    })

    it('should go to the sign in page', () => {
        cy.contains('a', 'Sign In').click()
        cy.location('pathname').should('equal', '/signin')
    })

    it('should sign up a new user', () => {
        const testuser = createRandomUser()

        cy.signup(testuser)

        cy.location('pathname').should('equal', '/dashboard')
    })

    it('should sign in a user', () => {
        const testuser = createRandomUser()

        cy.signup(testuser)

        cy.location('pathname').should('equal', '/dashboard')

        cy.contains('button', 'Logout').click()

        cy.contains('a', 'Sign In').click()

        cy.get('input[id="username"]').type(testuser.username)
        cy.get('input[id="password"]').type(testuser.password)
        cy.contains('button', 'Sign in').click()

        cy.location('pathname').should('equal', '/dashboard')
        cy.contains('button', 'Logout')
    })
})

export {}
