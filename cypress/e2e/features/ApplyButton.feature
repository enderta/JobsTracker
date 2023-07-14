Feature: Testing apply button
  Background:
    Given I am on the jobs tracker app

    Scenario: Clicking apply button
        When I click on the apply button
        Then I should see the applied at today's date