Feature: Interested Items List
  As a user
  I want to see a list of products I have marked as interested
  So that I can easily track and purchase them later

  Background:
    Given I am a logged-in user
    And the system has the following interest records for me:
      | id | name         | price | status    |
      | 10 | MacBook Pro  | 12000 | available |
      | 11 | iPad Air     | 4500  | sold      |

  @javascript
  Scenario: Successfully view the list of interested goods
    When I navigate to the interested items page
    Then I should see "MacBook Pro" with price "12000"
    And I should see "iPad Air" with price "4500"
    And the status for "iPad Air" should be "sold"

  @javascript
  Scenario: Navigate to product detail page when clicking an item
    When I navigate to the interested items page
    And I click on the item card for "MacBook Pro"
    Then I should be redirected to the product page with ID "10"

  @javascript
  Scenario: View empty state when no items are marked
    Given I have no interested items
    When I navigate to the interested items page
    Then I should see "You haven't marked any items as interested yet."