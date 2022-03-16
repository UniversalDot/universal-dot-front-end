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

  it('displays info message for creating profiles', () => {

    // Verify we have header that prompts user to create a profile
    cy.get('div.ui.info.message div.header')
      .first()
      .should('have.text', `It seems you haven't created a profile yet...`)
    
  })

  // it('user can navigate to screen to create profile', () => {

  //   // Verify that the user can create a profile
  //   cy.get('div.ui.info.message a')
  //     .should('have.attr', 'href')


  //   cy.get('div.ui.info.message a')
  //     .click()
  // })

  it('user fill out his interests', () => {

    const typedText = 'web development'

    // Verify that the user can create a profile
    // cy.get('div.ui.info.message a')
    //   .should('have.attr', 'href')


    // cy.get('div.ui.info.message a')
    //   .click()

    cy.get('div.ui.fluid.action.labeled.input')
      .type(typedText)

    cy.get('button.ui.icon.button')
      .click({force: true})

    cy.get('div.ui.blue.basic.label')
      .should('have.text', typedText)
  })

  it('user can create profile', () => {

    const typedText = 'example'

    // Verify that the user can create a profile
    cy.get('div.ui.info.message a')
      .should('have.attr', 'href')

    cy.get('div.ui.info.message a')
      .click()

    cy.get('div.ui.fluid.action.labeled.input')
      .type(typedText)

    cy.get('button.ui.icon.button')
      .click({force: true})

    cy.get('div.ui.blue.basic.label')
      .should('have.text', typedText)

    cy.get('button.ui.blue.button')
      .click({force: true})
  })

  it('displays current user information', () => {

    // Verify that the user information is shown
    cy.get('div.ui div.header').last().should('have.text', 'ALICE')
  })
})
