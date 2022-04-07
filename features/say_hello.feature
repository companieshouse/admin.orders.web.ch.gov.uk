Feature: Greet the user

    Scenario: Say hello
        When I navigate to the hello page
        Then The main heading should be "Hello!"

    Scenario: Say goodbye
        Given I have navigated to the hello page
        When I click goodbye
        Then I should be taken to the goodbye page
