// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// import 'cypress-iframe'
import SignInPage from '../support/PageObjects/Authenticate/SignInPage'
import SignOutPage from '../support/PageObjects/Authenticate/SignOutPage'
import NotifyPopUps from '../support/PageObjects/NotifyPopUps'
import 'cypress-file-upload'


Cypress.Commands.add('login', (username, password) => {

    const signInPage=new SignInPage()
  
    // Used environment variable from cypress.json
    cy.visit(Cypress.env('url'))
  
    //Used page objects to centralize locators
    signInPage.getSignInUserBox().type(username)
    signInPage.getSignInPasswordBox().type(password)
    signInPage.getSignInbutton().contains('Sign in').click()
    cy.wait(3000)
    cy.url().should('include','/content-pack/',{timeout:10000})
})

Cypress.Commands.add('logout', (username) => {

    const signOutPage=new SignOutPage()
    signOutPage.getSignOutbutton().click({force:true})
})

Cypress.Commands.add('clearnotifications', (username) => {

    cy.get("app-notification button[type='button']").click({ multiple: true })
})

Cypress.Commands.add('SuccessNotify', (msg,textbackgroundcolor,successbackgroundcolor,imgcolor) => {

    const noti=new NotifyPopUps()
    noti.getTextArea().should('have.css','background-color',textbackgroundcolor)
    noti.getICONArea().should('have.css','background-color',successbackgroundcolor)
    noti.getSuccessImg().should('have.attr','src','assets/images/success.svg')
    noti.getNotifyPopup().should(($span) => {}).then(($span) => {
      expect($span).to.contain.text(msg)
    })
})
Cypress.Commands.add('FailureNotify', (msg,textbackgroundcolor,failurebackgroundcolor) => {

    const noti=new NotifyPopUps()
    noti.getTextArea().should('have.css','background-color',textbackgroundcolor)
    noti.getICONArea().should('have.css','background-color',failurebackgroundcolor)
    noti.getSuccessImg().should('have.attr','src','assets/images/circle-cross-filled.svg')
    noti.getNotifyPopup().should(($span) => {}).then(($span) => {
      expect($span).to.contain.text(msg)
    })
})
Cypress.Commands.add('InfoNotify', (msg,textbackgroundcolor,successbackgroundcolor,imgcolor) => {

  const noti=new NotifyPopUps()
  noti.getTextArea().should('have.css','background-color',textbackgroundcolor)
  noti.getICONArea().should('have.css','background-color',successbackgroundcolor)
  noti.getSuccessImg().should('have.attr','src','assets/images/info.svg')
  noti.getNotifyPopup().should(($span) => {}).then(($span) => {
    expect($span).to.contain.text(msg)
  })
})
Cypress.Commands.add("finder", (xselector,toFind) => {

  const ele = xselector.then(cy.wrap)
  ele.find(toFind).click()
})

function ifExists (selector,UDPselector) {
    cy.document().then(($document) => {
      const documentResult = $document.querySelector(selector).innerHTML
      let result = documentResult.includes("select forwarder");
      if (result) {
        cy.wait(100)
        cy.get(UDPselector).click()
      }
    })
  }

  Cypress.Commands.add('ifExists', ifExists)
