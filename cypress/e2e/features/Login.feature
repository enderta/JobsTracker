Feature: Login testing
  Scenario: Login with invalid credentials
  Given I am on the login page
  When I enter username "test" into the "username" field
    Then I enter password "test" into the "password" field
    Then I press "Login"
    Then I should see title alert "User not found"