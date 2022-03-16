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

    cy.visit('http://universaldot.me')
  })

  it('displays current user information', () => {

    cy.get('div.ui div.header.UserQuickInfo_name__1S3sM').first().should('have.text', 'ALICE')
  })

  it('displays info message for creating profiles', () => {

    cy.get('div.ui.info.message div.header')
      .first()
      .should('have.text', `It seems you haven't created a profile yet...`)
    
  })

  it('user fill out his interests', () => {

    const username = 'MrBond'
    const interests = 'web development'

    cy.get('div.ui.fluid.action.labeled.input')
      .type(interests)

    cy.get('button.ui.icon.button')
      .click({force: true})

    cy.get('div.ui.blue.basic.label')
      .should('have.text', interests)
  })

  it('user can create profile', () => {

    const typedText = 'example'

    cy.get('div.ui.fluid.action.labeled.input')
      .type(typedText)

    cy.get('button.ui.icon.button')
      .click({force: true})

    cy.get('div.ui.blue.basic.label')
      .should('have.text', typedText)

    cy.get('button.ui.blue.button')
      .click({force: true})
  })
})
