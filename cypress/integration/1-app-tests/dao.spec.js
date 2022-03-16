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

    cy.visit('http://universaldot.me')
  })

  it('displays info message for creating profiles', () => {

    cy.get('div.ui.info.message div.header')
      .first()
      .should('have.text', `It seems you haven't created a profile yet...`)

  })
})
