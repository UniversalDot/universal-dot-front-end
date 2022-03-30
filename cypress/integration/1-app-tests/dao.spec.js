/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Dao', () => {
  beforeEach(() => {

    cy.visit('http://localhost:8000')
  })

  it('should be able to create an organization', () => {
      
    // Navigate to correct window
    cy.get('[data-cy=menuOrganization]')
      .click({force: true})
    cy.get('[data-cy=menuOwnOrganization]')
      .click({force: true})
    cy.get('[data-cy=createOrganization]')
      .click({force: true})

    // Create dao
    const name = 'UNIVERSALDOT FOUNDATION'

    cy.get('[data-cy=modalOrganizationName]')
      .type(name)

    cy.get('[data-cy=modalSubmit]')
      .click({force: true})
  })

  it('should be able to add member to an organization', () => {
    
    // Navigate to correct window
    cy.get('[data-cy=menuOrganization]')
      .click({force: true})
    cy.get('[data-cy=menuOwnOrganization]')
      .click({force: true})
    cy.get('[data-cy=addMember]')
      .click({force: true})

    // Type name and member of organization to add
    const name = 'UNIVERSALDOT FOUNDATION'
    const member = '5CDHUFkZ1Xchman33gXeimyMu14nJeT4CUd1KLVkgGgH6adv'

    cy.get('[data-cy=modalOrganizationName]')
      .type(name)
    cy.get('[data-cy=modalTaskMember]')
      .type(member)

    cy.get('[data-cy=modalSubmit]')
      .click({force: true})
  })


  it('should be able to remove an organization', () => {

    // Navigate to correct window
    cy.get('[data-cy=menuOrganization]')
      .click({force: true})
    cy.get('[data-cy=menuOwnOrganization')
      .click({force: true})
    cy.get('[data-cy=dissolveOrganization]')
      .click({force: true})

    const name = 'UNIVERSALDOT FOUNDATION'

    cy.get('[data-cy=modalOrganizationName]')
      .type(name)

    cy.get('[data-cy=modalSubmit]')
      .click({force: true})
  })

  //TODO: Implement the integration tests below
  it('should be able to remove a member from an organization', () => {


  })

  it('should be able to create vision document', () => {


  })

  it('should be able to remove vision document', () => {


  })

  it('should be able to search for accounts that have signed a vision document', () => {


  })

  it('should be able to add task to an organization', () => {


  })

  it('should be able to remove task from an organization', () => {


  })
})
