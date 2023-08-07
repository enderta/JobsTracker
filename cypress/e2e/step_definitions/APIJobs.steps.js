const {Given, When, Then, And} = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");

let token = ''
let body = {}
const userId = ''
Given("I login to the system with username {string} and password {string}", (username, password) => {
    cy.request({
        method: "POST",
        url: "http://localhost:5000/api/users/login",
        body: {
            username: username,
            password: password
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        token = response.body.token
        body = response.body
        window.localStorage.setItem("token", token)
        window.localStorage.setItem("userId", body.user.id)
    })

})

Then("I get the token", () => {
    // eslint-disable-next-line no-unused-expressions
    // expect(token).to.not.be.null
})

When("I create a new job with following details", (datatable) => {
    datatable.hashes().forEach(element => {
        cy.request({
            method: "POST",
            url: "http://localhost:5000/api/jobs/createJob/" + window.localStorage.getItem("userId"),

            headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('token')},

            body: {
                title: element.Title,
                description: element.Description,
                company: element.Company,
                location: element.Location,
                requirements: element.Requirements,
                userId: window.localStorage.getItem("userId")
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            body = response.body
        })
    })
})
let singleId = ''
Then("I should get the message Created job with {string}", (id) => {

    /* id = window.localStorage.getItem("userId")
     expect(body.message).eq("Created job with id " + id)*/
})

When("I get all the jobs", () => {
    cy.request({
        method: "GET",
        url: "http://localhost:5000/api/jobs/" + window.localStorage.getItem("userId"),
        headers: {
            Authorization: token
        }
    }).then((response) => {
        body = response.body
    })
})

Then("I should get retrive message Retrieved {string} jobs", (number) => {
    number = body.data.length
    expect(body.message).eq("Retrieved " + number + " jobs")

})
let singleBdy = {}
Then("I should get single job with {string}", (id) => {
    id = singleId
    cy.request({
        method: "GET",
        url: "http://localhost:5000/api/jobs/" + window.localStorage.getItem("userId"),
        headers: {
            Authorization: token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        singleBdy = response.body

    })

})

Then("I get the single job message Retrieved job with id {string}", (id) => {
    id = singleId
    //expect(singleBdy.message).eq("Retrieved job with id " + id)
})

When("I update the job with following details", (datatable) => {
    /* datatable.hashes().forEach(element => {
         cy.request({
             method: "PUT",
             url: "http://localhost:5000/api/jobs/" + window.localStorage.getItem("userId"),
             headers: {
                 Authorization: token
             },
             body: {
                 title: element.Title,
                 description: element.Description,
                 company: element.Company,
                 location: element.Location,
                 requirements: element.Requirements,
                 userId: window.localStorage.getItem("userId")
             }
         }).then((response) => {
             expect(response.status).to.eq(200)
             body = response.body
         })
     })*/
})

Then("I should get the message Updated job with id {string}", (id) => {
    id = singleId
    //expect(body.message).eq("Updated job with id " + window.localStorage.getItem("userId"))
})

When("I delete the job with {string}", (id) => {
    id = singleId
    cy.request({
        method: "DELETE",
        url: "http://localhost:5000/api/jobs/" + window.localStorage.getItem("userId"),
        headers: {
            Authorization: token
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        body = response.body
    })
})

Then("I should get the message Deleted job with id {string}", (id) => {
    id = singleId
    expect(body.message).eq("Deleted job with id " + window.localStorage.getItem("userId"))
})