Feature: Navigating the orders page

    Scenario: Search by Order ID
      Given I am at the Orders Search Page
      And   I have entered a valid Order-ID that matches the order-id of an existing order
      When  I click search
      Then  The matching order should be displayed in the table of results

  Scenario: Search by email-address
    Given I am at the Orders Search Page
    And   I have entered a valid email address that matches the e-mail address of existing orders
    When  I click search
    Then  The first page of results should be displayed in the table of results
    And   The results are displayed in date order (most recent to oldest)

  Scenario: Search by company number
    Given I am at the Orders Search Page
    And   I have entered a company number that matches the company number of existing orders
    When  I click search
    Then  The first page of results should be displayed in the table of results
    And   The results are displayed in date order  (most recent to oldest)

  Scenario: Any search criteria with link results returned in date order recent to oldest
    Given I am at the Orders Search page
    And   The result set will contain an order where the payment status IS “paid” AND order type IS “Certificate”
    When  I click search
    Then  The first page of results should be displayed in the table of results
    And   The matching order should have a hyperlink to the order details page for that order
    And   The results are displayed in date order (most recent to oldest)

  Scenario: Any search criteria without link results returned in date order recent to oldest
    Given I am at the Orders Search page
    And   The result set will contain an order where the where payment status is NOT “paid” AND/OR the order type IS NOT “Certificate”
    When  I click search
    Then  The first page of results should be displayed in the table of results
    And   The matching order should not have a hyperlink to the order details page for that order
    And   The results are displayed in date order (most recent to oldest)

  Scenario: Preservation of search criteria
    Given I am at the Orders Search page
    And   I have entered a search criteria
    When  I click search
    Then  The search criteria should be preserved in the text boxes

  Scenario: Results not found
    Given I am at the Orders Search Page
    And   No results will match my criteria
    When  I click search
    Then  A message stating “No matches found” is displayed

  Scenario: Service unavailable
    Given I am at the Orders Search Page
    And   The orders-api is unavailable
    When  I click search
    Then  A message is displayed stating “Service unavailable” is displayed