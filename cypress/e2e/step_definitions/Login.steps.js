const {Given, Then} = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");

Given('I am on the login page', () => {
    cy.visit("http://localhost:3000");

})

Then('I enter username {string} into the {string} field', (text, field) => {
    cy.xpath('//h1[contains(text(),"Login")]').should('be.visible').click(
        {force: true}
    );

    cy.get('[data-testid="username"]').clear().type(text);
})

Then('I enter password {string} into the {string} field', (text, field) => {
    cy.get('[data-testid="password"]').clear().type(text);
})

Then('I press {string}', (button) => {
    cy.get('[data-testid="login"]').click();
})

Then('I should see title alert {string}', (title) => {
    cy.on('window:alert', (str) => {
        expect(str).to.equal(title);
    })
})