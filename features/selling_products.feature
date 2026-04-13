Feature: Selling Products Management
  As a seller
  I want to manage the products I am currently selling
  So that I can update, view, or remove them from the marketplace

  Background:
    Given I am logged in as a seller
    And I have the following products in my selling list:
      | id | name            | price | status    |
      | 50 | Vintage Camera  | 500   | available |
      | 51 | Used Bicycle    | 1200  | reserved  |

  @javascript
  Scenario: Successfully viewing the selling list
    When I visit my selling products page
    Then I should see a table row for "Vintage Camera" with price "500" and status "available"
    And I should see a table row for "Used Bicycle" with price "1200" and status "reserved"

  @javascript
  Scenario: Navigating to the product edit page
    When I visit my selling products page
    And I click the "Edit" button for "Vintage Camera"
    Then I should be redirected to the edit page for product "50"

  @javascript
  Scenario: Navigating to the product detail view
    When I visit my selling products page
    And I click the view icon for "Used Bicycle"
    Then I should be redirected to the detail page for product "51"

  @javascript
  Scenario: Deleting a product with confirmation
    When I visit my selling products page
    And I click the "Delete" button for "Vintage Camera"
    And I confirm the deletion dialog
    Then I should see "Product deleted successfully!"
    And the product "Vintage Camera" should no longer be in the list

  @javascript
  Scenario: Viewing the empty state
    Given I have no products listed for sale
    When I visit my selling products page
    Then I should see "You haven't listed any products yet."