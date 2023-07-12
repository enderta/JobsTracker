const {Given, When, Then,And } = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");

/* Scenario: I see the jobs tracker app
    When I click on the add job button
    Then I fill in the job form with the following information:
    |Title|Description|Company|Location|Description|Requirements|
    |Software Engineer|Build cool stuff|Google|Mountain View|Ruby on Rails|Ruby on Rails|
    And I click on the submit button
    Then I should see the job I just added*/

When('I click on the add job button', () => {
    cy.get('[data-testid="addJobs"]').click()
})

Then('I fill in the job form with the following information:', (dataTable) => {
    console.log(dataTable.hashes())
    dataTable.hashes().forEach(element => {
        cy.get('[data-testid="Enter Title"]').type(element.Title)
        cy.get('[data-testid="Enter Description"]').type(element.Description)
        cy.get('[data-testid="Enter Company"]').type(element.Company)
        cy.get('[data-testid="Enter Location"]').type(element.Location)
        cy.get('[data-testid="Enter Requirements"]').type(element.Requirements)
        cy.get('[data-testid="Enter Description"]').type(element.Description)
    });
})

Then('I click on the submit button', () => {
    cy.get('[data-testid="submit-button"]').click()
})

Then('I should see the job I just added', () => {
    cy.get('tbody > :nth-child(1) > :nth-child(1)').should('have.text', 'Software Engineer')
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should('have.text', 'Build cool stuff')
    cy.get('tbody > :nth-child(1) > :nth-child(3)').should('have.text', 'Google')
    cy.get('tbody > :nth-child(1) > :nth-child(4)').should('have.text', 'Mountain View')
    cy.get('tbody > :nth-child(1) > :nth-child(5)').should('have.text', 'Ruby on Rails')
    cy.get('tbody > :nth-child(1) > :nth-child(6)').should('have.text', 'Ruby on Rails')
})