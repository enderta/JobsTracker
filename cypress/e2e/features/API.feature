Feature: API testing
  Scenario: Full circle CRUD test
    Given I login to the API by providing the username "et1" and password "123456"
   Then I get the token
    When I create a new user with the following details:
      | username | password | email |
      | et2      | 123456   |et2@gmai.com|
    Then I get the message "User created successfully"
    When I update the user with the following details:
      | username | password | email |
      | et2      | 123456   | et3@gmail.com|
    Then I get the message "User updated successfully"
    When I delete the user
    Then I get the message "User deleted successfully"