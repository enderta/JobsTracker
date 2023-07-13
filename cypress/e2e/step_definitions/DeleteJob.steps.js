const {Given, When, Then,And } = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");

/*
*  Scenario: Delete a job from the UI
    Given I have a job
    When I click on the delete button
    Then I should see the job deleted
    Then I should not see the job in the API
* */

Given('I have a job', () => {
   let bdy= {
        "title": "Job 1",
        "description": "Description 1",
        "company": "Company 1",
        "location": "Location 1",
        "requirements": "Requirements 1"
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/jobs',
        body: bdy
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

When('I click on the delete button', () => {
//
    /*let cardNum=0;
    cy.xpath("//div[@class='card-body']").then(
        ($el) => {
            cardNum=$el.length;


        }
    )*/
    cy.xpath(`(//div[@class='card-body']//div)[1]//..//..//div//button`).click()
    cy.wait(1000)

})

Then('I should see the job deleted', () => {
  cy.on("window:alert", (str) => {
      expect(str).to.equal("Job deleted successfully")
  })

})

Then('I should not see the job in the API', () => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:5000/api/jobs',
    }).then((response) => {
        expect(response.status).to.eq(200)
      let deletedJob= response.body.data.filter((job) => {
            return job.title=="Job 1"
        })
        expect(deletedJob.length).to.eq(0)
       })
    })
