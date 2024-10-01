Feature: Order summary page
  As a CHS Orders Admin user
  I want to view a summary of an order
  So I can see the items that make up that order

  Scenario: Display item summaries, delivery details and payment details for known item types and delivery timescales
    Given The checkout contains all known item types with all known delivery timescales
    When I view the order summary
    Then The following items should be displayed:
      | Item number       | Order type         | Company number | Dispatch method | Quantity| Fee |
      | MID-123123-123123 | Missing image      | 12345678       | N/A             | 1       |  £3 |
      | CRT-123123-123123 | Certificate        | 12345678       | Standard        | 1       | £15 |
      | CRT-123123-123124 | Certificate        | 12345679       | Express         | 1       | £50 |
      | CCD-123123-123123 | Certified document | 12345678       | Standard        | 1       | £15 |
      | CCD-123123-123124 | Certified document | 12345670       | Express         | 1       | £50 |
    And Delivery details for the order should be:
      | Delivery address                                                                      |
      | Forename Surname\nAddress line 1\nAddress line 2\nLocality\nRegion\nPostcode\nCountry |
    And Payment details for the order should be:
      | Status | Payment reference | Fee  |
      | Paid | payment_reference | £133 |

  Scenario: Hide the delivery details section if order contains no deliverable items
    Given The checkout contains no deliverable items
    When I view the order summary
    Then The following items should be displayed:
      | Item number       | Order type         | Company number | Dispatch method | Quantity| Fee |
      | MID-123123-123123 | Missing image      | 12345678       | N/A             | 1       | £3  |
    And Delivery details for the order should not be displayed
    And Payment details for the order should be:
      | Status | Payment reference | Fee  |
      | Paid | payment_reference | £3 |

  Scenario: Display order not found if the order summary doesn't exist
    Given The checkout does not exist
    When I view the order summary
    Then The order summary page should display order not found

  Scenario: Display service unavailable if an error occurs when displaying the order summary
    Given An error will occur when the checkout is fetched
    When I view the order summary
    Then The order summary page should display service unavailable

  Scenario: User signs out
    Given I am viewing an order summary
    When I click sign out
    Then I should be taken to the signout handler

  Scenario: Click back button
    Given Multi-item basket functionality has been enabled
    And The order summary page will load successfully
    And I have navigated to the order from the search page
    When I click the back button on the order summary page
    Then I should be returned from the order summary page to the orders search page
