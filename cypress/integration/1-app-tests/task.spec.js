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

describe('task', () => {
  beforeEach(() => {

    cy.visit('http://localhost:8000')
  })

  it('create task from Kanban', () => {

    // Navigate to correct window
    cy.get('[data-cy=menuOrganization]')
      .click({force: true})

    cy.get('[data-cy=menuDaoKanban]')
      .click({force: true})

    // Click the add new task button
    cy.get('[data-cy=addNewTask]')
      .click({force: true})

    // Fill out task data information
    const title = 'Create new substrate pallet'
    const specification = 'The pallet shall fullfil several requirements: 1. be open-source, 2. free-to-all'
    const budget = '77777'
    const deadline = '1000'

    cy.get('[data-cy=taskTitle]')
      .type(title)
    cy.get('[data-cy=taskSpecification]')
      .type(specification)
    cy.get('[data-cy=taskBudget]')
      .type(budget)
    cy.get('[data-cy=taskDeadline]')
      .type(deadline)

    cy.get('[data-cy=modalSubmit]')
      .click({force: true})
  })

  // Todo: Complete the integration tests bellow
  it('should check task information in Dashboard', () => {

    cy.get('[data-cy=menuDashboard]')
      .click({force: true})
  })

  it('should be able to start a task', () => {


  })

  it('should be able to complete a task', () => {


  })

  it('should be able to remove a task', () => {


  })


})
