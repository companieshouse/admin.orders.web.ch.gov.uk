Feature: View order details

  Scenario: View order details for an existing order
    Given The checkout endpoint will return a paid certificate order
    When I view order details
    Then The following order details should be displayed:
      | Ordered by     | Company name         | Company number | Certificate type                            | Statement of good standing | Registered office address | The names of all current company directors | The names of all current secretaries | Company objects |
      | demo@ch.gov.uk | TEST COMPANY LIMITED | 00000000       | Incorporation with all company name changes | Yes                        | No                        | No                                         | No                                   | No              |
    And The following delivery details should be displayed:
      | Delivery method                                            | Delivery details                                                                          |
      | Standard delivery (aim to dispatch within 10 working days) | forename\nsurname\naddress line 1\naddress line 2\nlocality\nregion\npostal code\ncountry |
    And The following payment details should be displayed:
      | Payment reference | Fee |
      | F00DFACE          | £15 |

  Scenario: Unpaid certificate
    Given The checkout endpoint will return an unpaid certificate order
    When I view order details
    Then Order not found should be displayed

  Scenario: Not a certificate
    Given The checkout endpoint will return a certified document order
    When I view order details
    Then Order not found should be displayed

  Scenario: Order not found
    Given The checkout endpoint will return HTTP 404 Not Found
    When I view order details
    Then Order not found should be displayed

  Scenario: Service unavailable
    Given The checkout endpoint will return a server error
    When I view order details
    Then Service unavailable should be displayed

  Scenario: User signout
    Given The checkout endpoint will return a paid certificate order
    When I view order details
    And I click sign out
    Then I should be taken to the signout handler
