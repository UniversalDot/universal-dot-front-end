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

describe('profile', () => {
  beforeEach(() => {

    cy.visit('http://localhost:8000')
  })

  it('displays current user information', () => {

    cy.get('[data-cy=nameInHeader]').should('have.text', 'ALICE')
  })

  it('displays info message for creating profiles', () => {

    cy.get('[data-cy=createProfilePrompt]')
      .first()
      .should('have.text', `It seems you haven't created a profile yet...`)
    
  })

  it('user fill out his interests', () => {

    const username = 'MrBond'
    const interests = 'web development'

    cy.get('[data-cy=inputInterests]')
      .type(interests)

    cy.get('button.ui.icon.button')
      .click({force: true})

    cy.get('[data-cy=interestCard]')
      .should('have.text', interests)
  })

  it('user can create profile', () => {

    const typedText = 'Substrate'

    cy.get('[data-cy=inputInterests]')
      .type(typedText)

    cy.get('button.ui.icon.button')
      .click({force: true})

    cy.get('[data-cy=interestCard]')
      .should('have.text', typedText)

    cy.get('[data-cy=createProfileButton]')
      .click({force: true})
  })
})
