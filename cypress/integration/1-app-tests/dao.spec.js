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

  it('should be able to create an organization', () => {
      
    // Navigate to correct window
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.ui.vertical.labeled.icon.ui.push.left.visible.sidebar.SidebarComponent_sidebar__tt_QJ.menu > a:nth-child(3) > div > span')
      .click({force: true})
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.ui.vertical.labeled.icon.ui.push.left.visible.sidebar.SidebarComponent_sidebar__tt_QJ.menu > a:nth-child(5) > div > span')
      .click({force: true})
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.pusher.SidebarComponent_sidebarContent__3Szbj > div > div > div.ui.stackable.four.column.grid.Organizations_grid__32fRb > div:nth-child(1) > div:nth-child(2) > button')
      .click({force: true})

    // Create dao
    const name = 'UNIVERSALDOT FOUNDATION'

    cy.get('body > div.ui.raised.segment > div > div.content.Modal_body__2rGrQ > div > div > div > div > input[type=text]')
      .type(name)

    cy.get('body > div.ui.raised.segment > div > div.extra.content > button')
      .click({force: true})
  })

  it('should be able to add member to an organization', () => {
    
    // Navigate to correct window
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.ui.vertical.labeled.icon.ui.push.left.visible.sidebar.SidebarComponent_sidebar__tt_QJ.menu > a:nth-child(3) > div > span')
      .click({force: true})
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.ui.vertical.labeled.icon.ui.push.left.visible.sidebar.SidebarComponent_sidebar__tt_QJ.menu > a:nth-child(5) > div > span')
      .click({force: true})
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.pusher.SidebarComponent_sidebarContent__3Szbj > div > div > div.ui.stackable.four.column.grid.Organizations_grid__32fRb > div:nth-child(1) > div:nth-child(3) > button')
      .click({force: true})

    // Type name and member of organization to add
    const name = 'UNIVERSALDOT FOUNDATION'
    const member = '5CDHUFkZ1Xchman33gXeimyMu14nJeT4CUd1KLVkgGgH6adv'

    cy.get('body > div.ui.raised.segment > div > div.content.Modal_body__2rGrQ > div > div:nth-child(1) > div > div > input[type=text]')
      .type(name)
    cy.get('body > div.ui.raised.segment > div > div.content.Modal_body__2rGrQ > div > div:nth-child(2) > div > div > input[type=text]')
      .type(member)

    cy.get('body > div.ui.raised.segment > div > div.extra.content > button')
      .click({force: true})


  })


  it('should be able to remove an organization', () => {

    // Navigate to correct window
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.ui.vertical.labeled.icon.ui.push.left.visible.sidebar.SidebarComponent_sidebar__tt_QJ.menu > a:nth-child(3) > div > span')
      .click({force: true})
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.ui.vertical.labeled.icon.ui.push.left.visible.sidebar.SidebarComponent_sidebar__tt_QJ.menu > a:nth-child(5) > div > span')
      .click({force: true})
    cy.get('#root > div.pushable.SidebarComponent_sidebarComponent__2URF8 > div.pusher.SidebarComponent_sidebarContent__3Szbj > div > div > div.ui.stackable.four.column.grid.Organizations_grid__32fRb > div:nth-child(2) > div:nth-child(2) > button')
      .click({force: true})

    const name = 'UNIVERSALDOT FOUNDATION'

    cy.get('body > div.ui.raised.segment > div > div.content.Modal_body__2rGrQ > div > div > div > div > input[type=text]')
      .type(name)

    cy.get('body > div.ui.raised.segment > div > div.extra.content > button')
      .click({force: true})
  })
})
