Feature: Testing the Jobs Tracker App

  Background:
    Given I am on the login page
    When I enter username "et1" into the "username" field
    Then I enter password "123456" into the "password" field
    Then I press "Login"



  Scenario: I see the jobs tracker app
    Then I should see "Job Tracker App"

  Scenario: I same number of jobs as the app and database
    Given I login to the api "et1" and password "123456"
    When I make a GET request
    And the number of jobs in the response should be the same as the number of jobs in the app

