Feature: Navigating the orders page

  Scenario: Search by criteria
    Given I have opened the search orders page
    And   I have entered search criteria for order number, email and company number
    And   An order placed for a certificate has been paid for
    And   An order placed for a missing image delivery has been paid for
    When  I click search
    Then  The following results should be returned:
      | Order number      | Email          | Company number | Order type    | Order date | Payment status | Linkable |
      | ORD-123123-123123 | demo@ch.gov.uk | 12345678       | Certificate   | 11/04/2022 | Paid           | true     |
      | ORD-321321-321321 | demo@ch.gov.uk | 87654321       | Missing image | 11/04/2022 | Paid           | false    |

  Scenario: Results not found
    Given I have opened the search orders page
    And   No results will match my criteria
    When  I click search
    Then  No matches found should be displayed

  Scenario: Service unavailable
    Given I have opened the search orders page
    And   Orders API is unavailable
    When  I click search
    Then  The service unavailable page should be displayed
