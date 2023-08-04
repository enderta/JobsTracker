Feature: Jobs API testing

  Background:
    Given I login to the system with username "et1" and password "123456"
    Then I get the token

  Scenario: Create a new job
    When I create a new job with following details
      | Title           | Description       | Company | Location | Requirements |
      | Software Tester | Test the web site | Apple   | London   | Java         |
    Then I should get the message Created job with "id"
    When I get all the jobs
    Then I should get retrive message Retrieved "number" jobs
    Then I should get single job with "id"
    Then I get the single job message Retrieved job with id "id"
    When I update the job with following details
      | Title           | Description       | Company | Location | Requirements |
      | Software Tester | Test the web site | Apple   | London   | Java         |
    Then I should get the message Updated job with id "id"
    When I delete the job with "id"
    Then I should get the message Deleted job with id "id"
