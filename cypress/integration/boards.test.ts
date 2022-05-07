import { createRandomUser } from '../support/helpers'

describe('boards', () => {
    const testuser = createRandomUser()

    before(() => {
        cy.visit('/')

        cy.signup(testuser)
        cy.location('pathname').should('equal', '/dashboard')
        cy.saveLocalStorage()

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
    })

    after(() => {
        cy.task('dbQuery', "DELETE FROM boards WHERE board_name ILIKE 'test%';")
        cy.task('dbQuery', "DELETE FROM users WHERE username ILIKE 'test%';")
    })

    beforeEach(() => {
        cy.restoreLocalStorage()
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

    it('should navigate to board, create, update and delete columns', () => {
        cy.contains('div', 'test board').click()

        // CREATE COLUMNS
        const columnsToCreate = ['test column 1', 'test column 2']

        columnsToCreate.map(col => cy.get('textarea[name="add column"]').type(`${col}{enter}`))

        const columns = cy.get('input[type="text"]')
        columns.should('have.lengthOf', 2)

        columns.each((col, idx) => expect(col.val()).to.equal(columnsToCreate[idx]))

        // UPDATE FIRST COL
        const updatedCol = columns.first()

        updatedCol.click().type(' - updated{enter}')

        updatedCol.should('have.value', `${columnsToCreate[0]} - updated`)

        // DELETE THE FIRST COL
        cy.get('[data-test-id="delete-column-0"]').click()

        const columnLeft = cy.get('input[type="text"]')
        columnLeft.should('have.lengthOf', 1)

        columnLeft.should('have.value', columnsToCreate[1])
    })

    it('should delete a board', () => {
        cy.visit('/dashboard')

        cy.contains('p', 'test board')

        cy.get('[data-test-id="delete-board-0"]').click()

        cy.contains('p', 'test board').should('not.exist')
    })
})

export {}
