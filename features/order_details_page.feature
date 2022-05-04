Feature: View order details

  Scenario: View order details for an existing order
    Given I have found an order
    When I click the order ID
    Then The following order details should be displayed:
      | Ordered by     | Company name         | Company number | Certificate type                            | Statement of good standing | Registered office address | The names of all current company directors | The names of all current secretaries | Company objects |
      | demo@ch.gov.uk | TEST COMPANY LIMITED | 00000000       | Incorporation with all company name changes | Yes                        | No                        | No                                         | No                                   | No              |
    And The following delivery details should be displayed:
      | Delivery method                                            | Delivery details                                                                          |
      | Standard delivery (aim to dispatch within 10 working days) | forename\nsurname\naddress line 1\naddress line 2\nlocality\nregion\npostal code\ncountry |
    And the following payment details should be displayed:
      | Payment reference | Fee |
      | F00DFACE          | £15 |

  Scenario: Order not found
    When I open order details for a nonexistent order
    Then Not found should be displayed

  Scenario: Service unavailable
    Given The checkout endpoint will return an error
    When I open the order
    Then The service unavailable page should be displayed

  Scenario: User signout
    Given I have opened an order
    When I click sign out
    Then I should be taken to the signout handler
