const {Given, When, Then, And} = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");



When('I click on the dark mode button', () => {
    cy.xpath(`//button[@id='darkMode']//span`).click()
})

Then('The background color should change', () => {
    cy.xpath(`//button[@id='darkMode']//span`).should('have.class', "darkModeOff")
    cy.xpath(`//button[@id='darkMode']//span`).click()
    cy.xpath(`//button[@id='darkMode']//span`).should('have.class', "darkModeOn")
    cy.get('.row > :nth-child(1) > div > .btn').click({force: true});
})