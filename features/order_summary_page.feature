Feature: Order summary page
  As a CHS Orders Admin user
  I want to view a summary of an order
  So I can see the items that make up that order

  Scenario: View order summary
    Given The checkout contains the following items:
      | Missing image delivery                |
      | Certificate with standard delivery    |
      | Certificate with express delivery     |
      | Certified copy with standard delivery |
      | Certified copy with express delivery  |
    When I view the order summary
    Then The following items should be displayed:
      | Item number       | Order type         | Company number | Delivery method | Fee |
      | MID-123123-123123 | Missing image      | 12345678       | N/A             | £3  |
      | CRT-123123-123123 | Certificate        | 12345678       | Standard        | £15 |
      | CRT-123123-123124 | Certificate        | 12345678       | Express         | £50 |
      | CCD-123123-123123 | Certified document | 12345678       | Standard        | £15 |
      | CCD-123123-123124 | Certified document | 12345678       | Express         | £50 |
    And Delivery details for the order should be:
      | Delivery address | "forename surname\naddress line 1\naddress line 2\nlocality\nregion\npostal code\ncountry" |
    And Payment details for the order should be:
      | Payment reference | Fee  |
      | F00DFACE          | £133 |
