Feature: Testing apply button

  Background:
    Given I am on the login page
    When I enter username "et1" into the "username" field
    Then I enter password "123456" into the "password" field
    Then I press "Login"


  Scenario: Clicking apply button
    When I click on the apply button
    Then I should see the applied at today's date