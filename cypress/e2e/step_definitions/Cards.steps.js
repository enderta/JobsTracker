const {Given, When, Then,And } = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");

Given('I am on the jobs tracker app', () => {
    cy.visit("http://localhost:3000");
})

Then('I should see {string}', (content) => {
    cy.title().should('include', content);
})

/*  Scenario: I same number of jobs as the app and database
    When I make a GET request to
    Then the status code should be 200
    And the number of jobs in the response should be the same as the number of jobs in the app
        */
let body=[]
When(`I make a GET request`,()=>{
    cy.request('http://localhost:5000/api/jobs',{
        method: 'GET',
    })
        .then(
            (response) => {
                expect(response.status).to.eq(200)
                console.log(response.body.data)
                body=response.body.data
                console.log(body)
            }
        )

})

Then (`the number of jobs in the response should be the same as the number of jobs in the app`,()=>{
    cy.get('.col-md-3 > [data-testid="cards-component"]')
        .then((elements) => {
            expect(elements.length).to.eq(body.length)
        })
})

/*When I make a POST request with the job
    Then I should see the job in the response
    And The same job should be in the app*/
let bdy={}
When(`I make a POST request with the job`,()=>{
  cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/jobs',
      body: {
          "title": "Software Engineer",
          "company": "Google",
          "location": "London",
          "description": "Software Engineer at Google",

      }
  })
      .then(
          (response) => {
              expect(response.status).to.eq(200)
              console.log(response.body.data)
              bdy=response.body.data
              console.log(bdy)
          })
  })


Then(`I should see the job in the response`,()=>{
    cy.reload()

})

Then(`The same job should be in the app`,()=>{
    cy.get('.col-md-3 > [data-testid="cards-component"]')
        .then((elements) => {
            expect(elements.length).to.eq(body.length+1)
        })
})


Given('I am on the homepage', () => {
    cy.visit('http://localhost:3000')
})

