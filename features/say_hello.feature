Feature: Greet the user

    Scenario: Say hello
        When I navigate to the hello page
        Then The main heading should be "Hello!"

    Scenario: Say goodbye
        Given I have navigated to the hello page
        When I click goodbye
        Then I should be taken to the goodbye page

    Scenario: Say hello with name
        Given I have said goodbye
        And my name is John
        When I click hello
        Then I should be greeted with Hello John!

    Scenario: Say hello without name
        Given I have said goodbye
        And my name is John
        When I click hello
        Then I should be greeted with Hello!

