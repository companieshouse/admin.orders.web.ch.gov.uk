Feature: Item summary for certified certificates
  As a CHS Orders user
  I want to be able to view a summary of a certificate item within an order
  So I have information on the specific details of the order

  Scenario: Certificate for active limited company
    Given The item is a certificate requested for an active limited company
    When I view the certificate order item summary
    Then The following item details should be displayed:
      | Item number       | Company name         | Company number | Certificate type                            | Statement of good standing | Registered office address | The names of all current company directors | The names of all current secretaries | Company objects | Delivery method                                            | Delivery address                                                                                 | Email copy required                              | Email address     | Fee |
      | CRT-123123-123123 | COMPANY NAME LIMITED | 12345678       | Incorporation with all company name changes | Yes                        | Current address           | No                                         | No                                   | No              | Standard delivery (aim to dispatch within 10 working days) | bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom | Email only available for express delivery method | example@ch.gov.uk | £15 |

  Scenario: Certificate for administrated limited company
    Given The item is a certificate requested for an administrated limited company
    When I view the certificate order item summary
    Then The following item details should be displayed:
      | Item number       | Company name         | Company number | Certificate type                            | Registered office address            | The names of all current company directors | The names of all current secretaries | Company objects | Administrators' details | Delivery method                                                                                                                           | Delivery address                                                                                 | Email copy required | Email address     | Fee |
      | CRT-123123-123123 | COMPANY NAME LIMITED | 12345678       | Incorporation with all company name changes | Current address and the one previous | Yes                                        | Yes                                  | Yes             | Yes                     | Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day) | bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom | Yes                 | example@ch.gov.uk | £15 |

  Scenario: Certificate for liquidated limited company
    Given The item is a certificate requested for a liquidated limited company
    When I view the certificate order item summary
    Then The following item details should be displayed:
      | Item number       | Company name         | Company number | Certificate type                            | Registered office address            | The names of all current company directors                                                                                                       | The names of all current secretaries                                | Company objects | Liquidators' details | Delivery method                                                                                                                           | Delivery address                                                                                 | Email copy required | Email address     | Fee |
      | CRT-123123-123123 | COMPANY NAME LIMITED | 12345678       | Incorporation with all company name changes | Current address and the two previous | Including directors':\n\nCorrespondence address\nOccupation\nDate of birth (month and year)\nAppointment date\nNationality\nCountry of residence | Including secretaries':\n\nCorrespondence address\nAppointment date | Yes             | Yes                  | Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day) | bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom | No                  | example@ch.gov.uk | £15 |

  Scenario: Certificate for dissolved limited company
    Given The item is a certificate requested for a dissolved limited company
    When I view the missing image delivery order item summary
    Then The following item details should be displayed:
      | Item number       | Company name         | Company number | Certificate type                          | Delivery method                                            | Delivery address                                                                                 | Email copy required                              | Email address     | Fee |
      | CRT-123123-123123 | COMPANY NAME LIMITED | 12345678       | Dissolution with all company name changes | Standard delivery (aim to dispatch within 10 working days) | bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom | Email only available for express delivery method | example@ch.gov.uk | £15 |

  Scenario: Certificate for active LLP
    Given The item is a certificate requested for an active LLP
    When I view the certificate order item summary
    Then The following item details should be displayed:
      | Item number       | Company name         | Company number | Certificate type                            | Statement of good standing | Registered office address | The names of all current designated members | The names of all current members | Delivery method                                            | Delivery address                                                                                 | Email copy required                              | Email address     | Fee |
      | CRT-123123-123123 | COMPANY NAME LIMITED | 12345678       | Incorporation with all company name changes | No                         | No                        | No                                          | No                               | Standard delivery (aim to dispatch within 10 working days) | bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom | Email only available for express delivery method | example@ch.gov.uk | £15 |

  Scenario: Certificate for administrated LLP
    Given The item is a certificate requested for an administrated LLP
    When I view the certificate order item summary
    Then The following item details should be displayed:
      | Item number       | Company name         | Company number | Certificate type                            | Registered office address | The names of all current designated members | The names of all current members | Administrators' details | Delivery method                                                                                                                           | Delivery address                                                                                 | Email copy required | Email address     | Fee |
      | CRT-123123-123123 | COMPANY NAME LIMITED | 12345678       | Incorporation with all company name changes | Current address           | Yes                                         | Yes                              | Yes                     | Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day) | bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom | Yes                 | example@ch.gov.uk | £15 |

  Scenario: Certificate for liquidated LLP
    Given The item is a certificate requested for a liquidated LLP
    When I view the certificate order item summary
    Then The following item details should be displayed:
      | Item number       | Company name         | Company number | Certificate type                            | Registered office address            | The names of all current designated members                                                                                      | The names of all current members                                                                                      | Liquidators' details | Delivery method                                                                                                                           | Delivery address                                                                                 | Email copy required | Email address     | Fee |
      | CRT-123123-123123 | COMPANY NAME LIMITED | 12345678       | Incorporation with all company name changes | Current address and the one previous | Including designated members':\n\nCorrespondence address\nAppointment date\nCountry of residence\nDate of birth (month and year) | Including members':\n\nCorrespondence address\nAppointment date\nCountry of residence\nDate of birth (month and year) | Yes                  | Express (Orders received before 11am will be dispatched the same day. Orders received after 11am will be dispatched the next working day) | bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom | No                  | example@ch.gov.uk | £15 |

  Scenario: Certificate for dissolved LLP
    Given The item is a certificate requested for a dissolved LLP
    When I view the certificate order item summary
    Then The following item details should be displayed:
      | Item number       | Company name         | Company number | Certificate type                          | Delivery method                                            | Delivery address                                                                                 | Email copy required                              | Email address     | Fee |
      | CRT-123123-123123 | COMPANY NAME LIMITED | 12345678       | Dissolution with all company name changes | Standard delivery (aim to dispatch within 10 working days) | bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom | Email only available for express delivery method | example@ch.gov.uk | £15 |

  Scenario: Certificate for active limited partnership
    Given The item is a certificate requested for an active limited partnership
    When I view the certificate order item summary
    Then The following item details should be displayed:
      | Item number       | Company name         | Company number | Certificate type                            | Statement of good standing | Principal place of business          | The names of all current general partners | The names of all current limited partners | General nature of business | Delivery method                                            | Delivery address                                                                                 | Email copy required                              | Email address     | Fee |
      | CRT-123123-123123 | COMPANY NAME LIMITED | 12345678       | Incorporation with all company name changes | Yes                        | Current address and the two previous | Yes                                       | Yes                                       | Yes                        | Standard delivery (aim to dispatch within 10 working days) | bob bob\ncompany name\naddress line 1\naddress line 2\nlocal\nregion\npostcode\nUnited Kingdom | Email only available for express delivery method | example@ch.gov.uk | £15 |

  Scenario: Display item not found if nonexistent item fetched
    Given The requested order item resource does not exist
    When I view the certificate order item summary
    Then The order item summary page should display order not found

  Scenario: Display service unavailable if an error occurs when displaying the order summary
    Given An error will occur when the order item is fetched
    When I view the certificate order item summary
    Then The order item summary page should display service unavailable

  Scenario: User signs out
    Given I am viewing a certificate order item summary
    When I click sign out
    Then I should be taken to the signout handler

  Scenario: Click back button
    Given The certificate order item summary page will load successfully
    And I have opened a certificate item via the order summary page
    When I click the back button on the order item summary page
    Then I should be returned from the order item summary page to the order summary page
