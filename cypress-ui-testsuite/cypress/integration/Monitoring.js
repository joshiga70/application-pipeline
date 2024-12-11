/// <reference types="cypress" />

describe('Check if monitoring page is accessible or not', function()
{

  it('Navigate to Monitoring page', function() {

    cy.url().should('include','.amazonaws.com:8080')
  })
  
  it('Check title on monitoring page', function() {
  
    cy.get('h1').should('include','Welcome to Monitoring!')
  })
  
  it('Check button on monitoring page', function() {
  
    cy.get('form button').should('have.text','View Pod Status')
  })

 }
)

describe('Check if URL is accessible with 200 status code', function()
{

  it('Navigate to Monitoring page', function() {

    cy.url().should('include','.amazonaws.com:8080')
  })
  
  it('Check the URL of monitoring pagee', function() {
  
    cy.url().should('include','.amazonaws.com:8080')
  })
 }
)

describe('Click the button to navigate to cluster status page', function()
{

  it('Navigate to Monitoring page', function() {

    cy.url().should('include','.amazonaws.com:8080')
  })
  
  it('Click on pod status button', function() {
  
    cy.get('form button').should('have.text','View Pod Status').click()
  })
    
  it('Check the URL of status page', function() {
  
    cy.url().should('include','.amazonaws.com:8080/pod-status')
  })
    
  it('Check the cluster details on status page', function() {
  
    cy.get('body pre').should('include.text','Running')
  })
 }
)