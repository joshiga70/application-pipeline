/// <reference types="cypress" />

Given('Navigate to Monitoring page', function() {
    cy.url().should('include','.amazonaws.com:8080')
})

Then('Check title on monitoring page', function(){
    cy.get('h1').should('include','Welcome to Monitoring!')
})

Then('Check button on monitoring page', function(){
    cy.get('form button').should('have.text','View Pod Status')
})

Then('Check the URL of monitoring page', function(){
    cy.url().should('include','.amazonaws.com:8080')
})

When('Click on pod status button', function(){
    cy.get('form button').should('have.text','View Pod Status').click()
})

Then('Check the URL of status page', function(){
    cy.url().should('include','.amazonaws.com:8080/pod-status')
})

Then('Check the cluster details on status page', function(){
    cy.get('body pre').should('include.text','Running')
})