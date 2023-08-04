const {Given, When, Then, And} = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");

/*
* Scenario: Clicking apply button
        When I click on the apply button
        Then I should see the applied at today's date
* */

When('I click on the apply button', () => {
    cy.get('h6').click({force: true, multiple: true})
    cy.wait(2000)
})

Then('I should see the applied at today\'s date', () => {
    let today = new Date();
    let currentDate = today.toString().split(' ').slice(0, 4).join(' ')
    console.log(currentDate)
    cy.xpath("//*[contains(text(),'" + currentDate + "')]").should('be.visible')
    cy.get('h6').click({force: true, multiple: true})
})