Feature: API testing

  Scenario: Full circle CRUD test
    When I register a new user with following details:
      | username | email         | password |
      | testuser | tes@gmail.com | 123456   |
    Then I get the message "User testuser registered successfully"
    When I login to the API by providing the username "testuser" and password "123456"
    Then I get the message "User logged in successfully"
    When I get the list of users
    Then The length of the list should equal in the message
    When I update the user with the following details:
      | username | password | email |
      | et2      | 123456   | et3@gmail.com|
    Then I get the message "User updated successfully"
    When I delete the user
    Then I get the message "User deleted successfully"