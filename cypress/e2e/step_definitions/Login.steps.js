const {Given, When, Then, And} = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");


Given('I am on the login page', () => {
    cy.visit("http://localhost:3000");
})

Then('I enter username {string} into the {string} field', (text, field) => {
    cy.get('[data-testid="username"]').type(text);
})

Then('I enter password {string} into the {string} field', (text, field) => {
    cy.get('[data-testid="password"]').type(text);
})

Then('I press {string}', (button) => {
    cy.get('[data-testid="login"]').click();
})

Then('I should see title alert {string}', (title) => {
    cy.on('window:alert', (str) => {
        expect(str).to.equal(title);
    })

})

Then('I should see {string} headline',(headline)=>{
    cy.get('.display-4').should('contain', headline);
})