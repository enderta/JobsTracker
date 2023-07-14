Feature: Testing dark mode button
  Background:
    Given I am on the jobs tracker app

Scenario: Dark mode button
    When I click on the dark mode button
    Then The background color should change