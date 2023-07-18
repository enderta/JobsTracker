Feature: Jobs API testing

  Background:
    Given I login to the system with username "admin" and password "admin"
    Then I get the token

  Scenario: Create a new job
    When I create a new job with following details
      | Title           | Description       | Company | Location |  Requirements  |
      | Software Tester | Test the web site | Apple   |       London   | Java |
    Then I should get the message "Job created successfully"
    When I get all the jobs
    Then I should get retrive message "Job retrieved successfully"
    Then I should get single job with "id"
    Then I get the single job message "Job retrieved successfully"
    When I update the job with following details
      | Title           | Description       | Company | Location |  Requirements  |
      | Software Tester | Test the web site | Apple   |       London   | Java |
    Then I should get the message "Job updated successfully"
    When I delete the job with "id"
    Then I should get the message "Job deleted successfully"
