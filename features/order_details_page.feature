Feature: View order details

  Scenario: View order details for a certificate order for a liquidated limited company
    Given The checkout endpoint will return a paid certificate order for a liquidated limited company
    When I view order details
    Then The following order details should be displayed:
      | Ordered by     | Company name         | Company number | Certificate type                            | Registered office address            | The names of all current company directors                                      | The names of all current secretaries                                | Company objects | Liquidators' details |
      | demo@ch.gov.uk | TEST COMPANY LIMITED | 00000000       | Incorporation with all company name changes | Current address and the two previous | Including directors':\n\nCorrespondence address\nDate of birth (month and year) | Including secretaries':\n\nCorrespondence address\nAppointment date | Yes             | Yes                  |
    And The following delivery details should be displayed:
      | Dispatch method                                           | Email copy required                              | Delivery details                                                                         |
      | Standard (aim to send out within 10 working days)| Email only available for express dispatch | forename surname\naddress line 1\naddress line 2\nlocality\nregion\npostal code\ncountry |
    And The following payment details should be displayed:
      | Payment reference | Fee |
      | CAFE              | £15 |

  Scenario: View order details for a certificate order for an active limited company
    Given The checkout endpoint will return a paid certificate order for an active limited company
    When I view order details
    Then The following order details should be displayed:
      | Ordered by      | Company name         | Company number | Certificate type                            | Summary statement previously known as statement of good standing | Registered office address          | The names of all current company directors | The names of all current secretaries | Company objects |
      | demo1@ch.gov.uk | TEST COMPANY LIMITED | 12345678       | Incorporation with all company name changes | Yes                        | All current and previous addresses | Yes                                        | Yes                                  | Yes             |
    And The following delivery details should be displayed:
      | Dispatch method                                            | Email copy required                              | Delivery details                                                                         |
      | Standard (aim to send out within 10 working days) | Email only available for express dispatch | forename surname\naddress line 1\naddress line 2\nlocality\nregion\npostal code\ncountry |
    And The following payment details should be displayed:
      | Payment reference | Fee |
      | CAFE              | £15 |

  Scenario: View order details for a certificate order for an administrated limited company
    Given The checkout endpoint will return a paid certificate order for an administrated limited company with no options requested
    When I view order details
    Then The following order details should be displayed:
      | Ordered by     | Company name         | Company number | Certificate type                            | Registered office address | The names of all current company directors | The names of all current secretaries | Company objects | Administrators' details |
      | demo@ch.gov.uk | TEST COMPANY LIMITED | 00000000       | Incorporation with all company name changes | No                        | No                                         | No                                   | No              | No                      |
    And The following delivery details should be displayed:
      | Dispatch method                                            | Email copy required                              | Delivery details                                                                         |
      | Standard (aim to send out within 10 working days) | Email only available for express dispatch | forename surname\naddress line 1\naddress line 2\nlocality\nregion\npostal code\ncountry |
    And The following payment details should be displayed:
      | Payment reference | Fee |
      | CAFE              | £15 |

  Scenario: View order details for an existing administrated LLP certificate order
    Given The checkout endpoint will return a paid certificate order for an administrated LLP
    When I view order details
    Then The following order details should be displayed:
      | Ordered by     | Company name         | Company number | Certificate type                            | Registered office address            | The names of all current designated members                                              | The names of all current members                                | Administrators' details |
      | demo@ch.gov.uk | TEST COMPANY LIMITED | 00000000       | Incorporation with all company name changes | Current address and the two previous | Including designated members':\n\nCorrespondence address\nDate of birth (month and year) | Including members':\n\nCorrespondence address\nAppointment date | Yes                     |
    And The following delivery details should be displayed:
      | Dispatch method                                            | Email copy required                              | Delivery details                                                                         |
      | Standard (aim to send out within 10 working days) | Email only available for express dispatch | forename surname\naddress line 1\naddress line 2\nlocality\nregion\npostal code\ncountry |
    And The following payment details should be displayed:
      | Payment reference | Fee |
      | CAFE              | £15 |

  Scenario: View order details for an existing active LLP certificate order
    Given The checkout endpoint will return a paid certificate order for an active LLP
    When I view order details
    Then The following order details should be displayed:
      | Ordered by     | Company name         | Company number | Certificate type                            | Summary statement previously known as statement of good standing | Registered office address | The names of all current designated members | The names of all current members |
      | demo@ch.gov.uk | TEST COMPANY LIMITED | 00000000       | Incorporation with all company name changes | No                         | No                        | Yes                                         | No                               |
    And The following delivery details should be displayed:
      | Dispatch method                                            | Email copy required                              | Delivery details                                                                         |
      | Standard (aim to send out within 10 working days) | Email only available for express dispatch | forename surname\naddress line 1\naddress line 2\nlocality\nregion\npostal code\ncountry |
    And The following payment details should be displayed:
      | Payment reference | Fee |
      | CAFE              | £15 |

  Scenario: View order details for an existing limited partnership certificate order
    Given The checkout endpoint will return a paid certificate order for an active limited partnership
    When I view order details
    Then The following order details should be displayed:
      | Ordered by     | Company name         | Company number | Certificate type                            | Summary statement previously known as statement of good standing | Principal place of business          | The names of all current general partners | The names of all current limited partners | General nature of business |
      | demo@ch.gov.uk | TEST COMPANY LIMITED | 00000000       | Incorporation with all company name changes | Yes                        | Current address and the two previous | Yes                                       | Yes                                       | Yes                        |
    And The following delivery details should be displayed:
      | Dispatch method                                            | Email copy required                              | Delivery details                                                                         |
      | Standard (aim to send out within 10 working days) | Email only available for express dispatch |forename surname\naddress line 1\naddress line 2\nlocality\nregion\npostal code\ncountry |
    And The following payment details should be displayed:
      | Payment reference | Fee |
      | CAFE              | £15 |

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
    Given The checkout endpoint will return a paid certificate order for an active limited company
    When I view order details
    And I click sign out
    Then I should be taken to the signout handler

  Scenario: Back link
    Given I am viewing a paid certificate order details     
      | Order number      | Email           | Company number | Order type     | Order date | Payment status | Linkable |
      | ORD-123123-123123 | demo1@ch.gov.uk | 12345678       | Certificate    | 11/04/2022 | Paid           | true     |
      | ORD-121212-121212 | demo2@ch.gov.uk | 12121212       | Certificate    | 11/04/2022 | In progress    | false    |
      | ORD-323232-323232 | demo3@ch.gov.uk | 32323232       | Certified copy | 11/04/2022 | Paid           | false    |
      | ORD-321321-321321 | demo4@ch.gov.uk | 87654321       | Missing image  | 11/04/2022 | Paid           | false    |
    When I click the back link
    Then I should return to the orders search page