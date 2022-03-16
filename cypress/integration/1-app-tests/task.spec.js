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

    cy.visit('http://universaldot.me')
  })

  it('create task from Kanban', () => {

    // Navigate to correct window
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.ui.vertical.labeled.icon.ui.push.left.visible.sidebar.SidebarComponent_sidebar__tt_QJ.menu > a:nth-child(3) > div > span')
      .click({force: true})

    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.ui.vertical.labeled.icon.ui.push.left.visible.sidebar.SidebarComponent_sidebar__tt_QJ.menu > a:nth-child(6) > div > span')
      .click({force: true})

    // Click the add new task button
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.pusher.SidebarComponent_sidebarContent__3Szbj > div > div > div.sc-jRQBWg.fGabQO.react-trello-board > div > div > section:nth-child(1) > div:nth-child(1) > button')
      .click({force: true})

    // Fill out task data information
    const title = 'Create new substrate pallet'
    const specification = 'The pallet shall fullfil several requirements: 1. be open-source, 2. free-to-all'
    const budget = '77777'
    const deadline = '1000'

    cy.get('body > div.ui.raised.segment > div > div.content.Modal_body__2rGrQ > div > div:nth-child(1) > div > div > input[type=text]')
      .type(title)
    cy.get('body > div.ui.raised.segment > div > div.content.Modal_body__2rGrQ > div > div:nth-child(2) > div > div > input[type=text]')
      .type(specification)
    cy.get('body > div.ui.raised.segment > div > div.content.Modal_body__2rGrQ > div > div:nth-child(3) > div > div > input[type=text]')
      .type(budget)
    cy.get('body > div.ui.raised.segment > div > div.content.Modal_body__2rGrQ > div > div:nth-child(4) > div > div > input[type=text]')
      .type(deadline)

    cy.get('body > div.ui.raised.segment > div > div.extra.content > button')
      .click({force: true})
  })

  it('should check task information in Dashboard', () => {

    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.ui.vertical.labeled.icon.ui.push.left.visible.sidebar.SidebarComponent_sidebar__tt_QJ.menu > a:nth-child(2) > div > span')
      .click({force: true})
  })

  it('should be able to start a task', () => {


  })

  it('should be able to complete a task', () => {


  })

  it('should be able to remove a task', () => {


  })


})
