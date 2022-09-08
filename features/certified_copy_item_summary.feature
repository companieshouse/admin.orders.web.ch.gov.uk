Feature: Item summary for certified copies
  As a CHS Orders user
  I want to be able to view a summary of a certified copy item within an order
  So I have information on the specific details of the order

  Scenario: Certified copy with standard delivery
    Given The item is a certified copy with standard delivery requested
    When I view the certified copy order item summary
    Then The following item details should be displayed:
      | Company name    | COMPANY NAME LIMITED                                       |
      | Company number  | 12345678                                                   |
      | Delivery method | Standard delivery (aim to dispatch within 10 working days) |
    And The following document details should be displayed:
      | Date filed  | Type | Description                                         | Fee |
      | 26 May 2015 | AP01 | Appointment of Mr Richard John Harris as a director | £15 |

  Scenario: Certified copy with express delivery
    Given The item is a certified copy with express delivery requested
    When I view the order item summary
    Then The following item details should be displayed:
      | Company name    | OTHER NAME LIMITED                                                                                                                        |
      | Company number  | 12345679                                                                                                                                  |
      | Delivery method | Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day) |
    And The following document details should be displayed:
      | Date filed  | Type | Description                                                          | Fee |
      | 12 May 2022 | SH01 | Statement of capital following an allotment of shares on 12 May 2022 | £50 |

  Scenario: Certified copy with unhandled filing history description
    Given The item is a certified copy of a document with an unhandled description
    When I view the order item summary
    Then The following item details should be displayed:
      | Company name    | UNHANDLED COMPANY NAME LIMITED                             |
      | Company number  | 12345670                                                   |
      | Delivery method | Standard delivery (aim to dispatch within 10 working days) |
    And The following document details should be displayed:
      | Date filed  | Type | Description    | Fee |
      | 26 May 2015 | AP02 | something-else | £15 |

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
    Given The certified copy order item summary page will load successfully
    And I have opened an item via the order summary page
    When I click the back button on the order item summary page
    Then I should be returned from the order item summary page to the order summary page
