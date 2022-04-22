Feature: Orders search page

  Scenario: Search by criteria
    Given I have opened the search orders page
    And   I have entered search criteria for order number, email and company number
    And   Orders API will return results
    When  I click search
    Then  The search criteria should be preserved
    And   The following orders should be displayed:
      | Order number      | Email          | Company number | Order type     | Order date | Payment status | Linkable |
      | ORD-123123-123123 | demo1@ch.gov.uk | 12345678       | Certificate    | 11/04/2022 | Paid           | true     |
      | ORD-121212-121212 | demo2@ch.gov.uk | 12121212       | Certificate    | 11/04/2022 | In progress    | false    |
      | ORD-323232-323232 | demo3@ch.gov.uk | 32323232       | Certified copy | 11/04/2022 | Paid           | false    |
      | ORD-321321-321321 | demo4@ch.gov.uk | 87654321       | Missing image  | 11/04/2022 | Paid           | false    |

  Scenario: Results not found
    Given I have opened the search orders page
    And   Orders API will return no results
    When  I click search
    Then  The search criteria should be preserved
    And   No matches found should be displayed

  Scenario: Service unavailable
    Given I have opened the search orders page
    And   Orders API will return an error
    When  I click search
    Then  The service unavailable page should be displayed
