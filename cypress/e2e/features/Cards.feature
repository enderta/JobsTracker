Feature: Testing the Jobs Tracker App

  Background:
    Given I am on the jobs tracker app

  Scenario: I see the jobs tracker app
    Then I should see "React App"

  Scenario: I same number of jobs as the app and database
    When I make a GET request
    And the number of jobs in the response should be the same as the number of jobs in the app
