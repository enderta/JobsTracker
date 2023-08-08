const {When, Then} = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");


When('I click on the apply button', () => {
    cy.get(':nth-child(1) > [data-testid="cards-component"] > .card-body > :nth-child(6) > div > p > span').click({
        force: true,
        multiple: true
    })
    cy.wait(2000)
})

Then('I should see the applied at today\'s date', () => {

    const date = new Date().toISOString().split(' ').slice(0, 4).join(' ');
    const currentDate = new Date(date).toISOString().split("T")[0]


    console.log(currentDate)
    cy.xpath("//*[contains(text(),'" + currentDate + "')]").should('be.visible')

})