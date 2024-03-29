Feature: Add jobs

  Background:
    Given I am on the login page
    When I enter username "et1" into the "username" field
    Then I enter password "123456" into the "password" field
    Then I press "Login"


  Scenario: I see the jobs tracker app
    When I click on the add job button
    Then I fill in the job form with the following information:
      | Title             | Description      | Company | Location      | Description   | Requirements  |
      | Software Engineer | Build cool stuff | Google  | Mountain View | Ruby on Rails | Ruby on Rails |
    Then I click on the submit button
    Then I should see the job I just added