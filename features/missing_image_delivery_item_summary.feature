Feature: Item summary for missing image delivery
  As a CHS Orders user
  I want to be able to view a summary of a missing image delivery item within an order
  So I have information on the specific details of the order

  Scenario: Missing image delivery item summary page
    Given The item is of type missing image delivery
    When I view the missing image delivery order item summary
    Then The following item details should be displayed:
      | Company name         | Company number | Date        | Type | Description                                         | Fee |
      | COMPANY NAME LIMITED | 12345678       | 26 May 2015 | AP01 | Appointment of Mr Richard John Harris as a director | £3 |

  Scenario: Missing image delivery with unhandled filing history description
    Given The item is a missing image delivery with an unhandled description
    When I view the missing image delivery order item summary
    Then The following item details should be displayed:
      | Company name                   | Company number | Date        | Type | Description    | Fee |
      | UNHANDLED COMPANY NAME LIMITED | 12345670       | 26 May 2015 | AP02 | something-else | £3 |

  Scenario: Display item not found if nonexistent item fetched
    Given The requested order item resource does not exist
    When I view the missing image delivery order item summary
    Then The order item summary page should display order not found

  Scenario: Display service unavailable if an error occurs when displaying the order summary
    Given An error will occur when the order item is fetched
    When I view the missing image delivery order item summary
    Then The order item summary page should display service unavailable

  Scenario: User signs out
    Given I am viewing a missing image delivery order item summary
    When I click sign out
    Then I should be taken to the signout handler

  Scenario: Click back button
    Given The missing image delivery order item summary page will load successfully
    And I have opened a missing image delivery item via the order summary page
    When I click the back button on the order item summary page
    Then I should be returned from the order item summary page to the order summary page
