const {Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

/*Feature: Testing the Jobs Tracker App
  Background:
    Given I am on the jobs tracker app
    Scenario: I see the jobs tracker app
      when I visit the jobs tracker app
      then I should see "Jobs Tracker"*/

Given('I am on the jobs tracker app', () => {
    cy.visit("http://localhost:3000");
})

Then('I should see {string}', (content) => {
    cy.title().should('include', content);
})
