const {Given, When, Then,And } = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");

let username = "";
let password = "";
let email = "";
let body={}
When ("I register a new user with following details:",(dataTable)=>{
    console.log(dataTable.rawTable)
    username = dataTable.rawTable[1][0];
    email = dataTable.rawTable[1][1];
    password = dataTable.rawTable[1][2];

    cy.request({
        method:"POST",
        url:"http://localhost:5000/api/users/register",
        body:{
            username:username,
            email:email,
            password:password
        }
    }).then((response)=>{
        expect(response.status).to.eq(200)
        body = response.body
    })
})

Then ("I get the register message {string}",(message)=>{
    expect(body.message).contains(message)
})
let token = ""
When ("I login to the API as new user",()=>{

    cy.request({
        method:"POST",
        url:"http://localhost:5000/api/users/login",
        body:{
            username:username,
            password:password
        }
    }).then((response)=>{
        expect(response.status).to.eq(200)
        token = response.body.token
        body = response.body
    })
})

Then ("I get the login message {string}",(message)=>{
    expect(message).contains(body.message)
})

let allUsers = {}
When ("I get the list of users",(username,password)=>{
        cy.request({
            method:"GET",
            url:"http://localhost:5000/api/users",
            headers:{
                Authorization:token
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            allUsers = response.body
        })
})

Then ("The length of the list should equal in the message",(message)=>{
    console.log(allUsers)
})
let singleUser = {}
let id= ""
When ("I get the user by id",()=>{
     id=body.user.id
    cy.request({
        method:"GET",
        url:"http://localhost:5000/api/users/"+id,
        headers:{
            Authorization:token
        }
    }).then((response)=>{
        expect(response.status).to.eq(200)
        singleUser = response.body
    })

})

Then ("I get the retrive message contains {string}",(message)=>{
    expect(singleUser.message).contains(message)
})

When ("I update the user with the following details:",(dataTable)=>{
    username = dataTable.rawTable[1][0];
    email = dataTable.rawTable[1][1];
    password = dataTable.rawTable[1][2];

    cy.request({
        method:"PUT",
        url:"http://localhost:5000/api/users/"+id,
        headers:{
            Authorization:token
        },
        body:{
            username:username,
            email:email,
            password:password
        }
    }).then((response)=>{
        expect(response.status).to.eq(200)
        body = response.body
    })
})

Then ("I get the update message {string}",(message)=>{
    expect(body.message).contains(message)
})

When ("I delete the user",()=>{

    cy.request({
        method:"DELETE",
        url:"http://localhost:5000/api/users/"+id,
        headers:{
            Authorization:token
        }
    }).then((response)=>{
        expect(response.status).to.eq(200)
        body = response.body
    })
})

Then ("I get delete the message {string}",(message)=>{
    expect(body.message).contains(message)
})