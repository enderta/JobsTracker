const {When, Then} = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");

When('I click on the delete button', () => {
    cy.xpath(`(//button[.='Delete'])[1]`).click()
    cy.wait(1000)
})

Then('I should see the job deleted', () => {
    cy.on("window:alert", (str) => {
        expect(str).to.equal("Job deleted successfully")
    })

})