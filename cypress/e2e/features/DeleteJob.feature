Feature: Deleting Job from the UI and the API

  Background:
    Given I am on the login page
    When I enter username "et1" into the "username" field
    Then I enter password "123456" into the "password" field
    Then I press "Login"


  Scenario: Delete a job from the UI
    Given I have a job
    When I click on the delete button
    Then I should see the job deleted
    Then I should not see the job in the API