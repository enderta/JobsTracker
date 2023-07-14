const {Given, When, Then,And } = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");


/*
* Scenario: Dark mode button
    When I click on the dark mode button
    Then The background color should change
* */

When('I click on the dark mode button', () => {
   cy.xpath(`//button[@id='darkMode']//span`).click()
})

Then('The background color should change', () => {
    cy.xpath(`//button[@id='darkMode']//span`).should('have.class',"darkModeOff")
    cy.xpath(`//button[@id='darkMode']//span`).click()
    cy.xpath(`//button[@id='darkMode']//span`).should('have.class',"darkModeOn")
})