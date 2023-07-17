Feature: Testing dark mode button
  Background:
  Background:
    Given I am on the login page
    When I enter username "et1" into the "username" field
    Then I enter password "123456" into the "password" field
    Then I press "Login"
    Then I should see "Jobs" headline


  Scenario: Dark mode button
    When I click on the dark mode button
    Then The background color should change