Feature: Item summary for missing image delivery
  As a CHS Orders user
  I want to be able to view a summary of a missing image delivery item within an order
  So I have information on the specific details of the order

  Scenario: Missing image delivery item summary page
    Given The item is of type missing image delivery
    When I view the missing image delivery order item summary
    Then The following item details should be displayed:
      | Company name    | COMPANY NAME LIMITED                                       |
      | Company number  | 12345678                                                   |
      | Date            | 26 May 2015                                                |
      | Type            | AP01                                                       |
      | Description     | Appointment of Mr Richard John Harris as a director        |
      | Fee             | £15                                                        |

  Scenario: Missing image delivery with unhandled filing history description
    Given The item is a missing image delivery of a document with an unhandled description
    When I view the missing image delivery the order item summary
    Then The following item details should be displayed:
      | Company name    | UNHANDLED COMPANY NAME LIMITED                             |
      | Company number  | 12345670                                                   |
      | Date            | 26 May 2015                                                |
      | Type            | AP02                                                       |
      | Description     | something-else                                             |
      | Fee             | £15                                                        |

  Scenario: Display item not found if nonexistent item fetched
    Given The requested order item resource does not exist
    When I view the order item summary
    Then The order item summary page should display item not found

  Scenario: Display service unavailable if an error occurs when displaying the order summary
    Given An error will occur when the order item is fetched
    When I view the order item summary
    Then The order item summary page should display service unavailable

  Scenario: User signs out
    Given I am viewing an order item summary
    When I click sign out
    Then I should be taken to the signout handler

  Scenario: Click back button
    Given The order item summary page will load successfully
    And I have opened an item via the order summary page
    When I click the back button on the order item summary page
    Then I should be returned from the order item summary page to the order summary page
