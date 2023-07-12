Feature: Testing the Jobs Tracker App

  Background:
    Given I am on the jobs tracker app

  Scenario: I see the jobs tracker app
    Then I should see "React App"

  Scenario: I same number of jobs as the app and database
    When I make a GET request
    And the number of jobs in the response should be the same as the number of jobs in the app

    Scenario: I can add a job
    When I make a POST request with the job
    Then I should see the job in the response
    Then The same job should be in the app