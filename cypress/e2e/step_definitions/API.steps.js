const {Given, When, Then,And } = require("@badeball/cypress-cucumber-preprocessor");
require("cypress-xpath");

/*
* Feature: API testing

  Scenario: Full circle CRUD test
    When I register a new user with following details:
      | username | email         | password |
      | testuser | tes@gmail.com | 123456   |
    Then I get the message "User testuser registered successfully"
    When I login to the API by providing the username "testuser" and password "123456"
    Then I get the message "User logged in successfully"
    When I get the list of users
    Then The length of the list should equal in the message
    When I get the user by id 1
    Then I get the message "User retrieved successfully"
    When I update the user with the following details:
      | username | password | email |
      | et2      | 123456   | et3@gmail.com|
    Then I get the message "User updated successfully"
    When I delete the user
    Then I get the message "User deleted successfully"
* */

When ("I regsiter a new user with following details:",(dataTable)=>{

})

Then ("I get the message {string}",(message)=>{

})

When ("I login to the API by providing the username {string} and password {string}",(username,password)=>{

})

Then ("I get the message {string}",(message)=>{

})

When ("I get the list of users",(username,password)=>{

})

Then ("The length of the list should equal in the message",(message)=>{

})

When ("I get the user by id {string}",(id)=>{

})

Then ("I get the message {string}",(message)=>{

})

When ("I update the user with the following details:",(dataTable)=>{

})

Then ("I get the message {string}",(message)=>{

})

When ("I delete the user",(id)=>{

})

Then ("I get the message {string}",(message)=>{

})