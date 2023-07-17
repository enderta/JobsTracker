Feature: API testing

  Scenario: Full circle CRUD test
    When I register a new user with following details:
      | username | email         | password |
      | testuser1 | test@gmail.com | 123456   |
    Then I get the register message "registered successfully"
    When I login to the API as new user
    Then I get the login message "User logged in successfully"
    When I get the list of users
    Then The length of the list should equal in the message
    When I get the user by id
    Then I get the retrive message contains "Retrieved"
    When I update the user with the following details:
      | username | password | email |
      | et2      | 123456   | et3@gmail.com|
    Then I get the update message "updated successfully"
    When I delete the user
    Then I get delete the message "deleted successfully"