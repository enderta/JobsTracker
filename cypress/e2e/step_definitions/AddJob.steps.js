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
let filleds = []
Then('I fill in the job form with the following information:', (dataTable) => {
    filleds = dataTable.hashes().map((element) => {
        return {
            Title: element.Title,
            Description: element.Description,
            Company: element.Company,
            Location: element.Location,
            Requirements: element.Requirements,
            Description: element.Description
        }
    })
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
    const text=[]
    cy.xpath("//div[@class='card-body']//div").then(
        (elements) => {
            elements.each((index, element) => {
                text.push(element.innerText)
            })
            console.log(text)
        }
    )
    cy.wrap(filleds).each((element) => {
        expect(text).to.include(element.Title)
        expect(text).to.include(element.Company)

    })

})