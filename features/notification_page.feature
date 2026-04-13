Feature: Notification and Chat List
  As a user of the CUHK Marketplace
  I want to see a list of my active and cancelled chats
  So that I can keep track of my trading requests

  Background:
    Given I am logged in as a user with ID 1 and name "Alice"

  @javascript
  Scenario: Displaying a list of active chats with correct partner names
    Given the following chats exist for me:
      | id | seller_id | seller_name | buyer_id | buyer_name | last_message       | status    |
      | 10 | 1         | Alice       | 2        | Bob        | Is this available? | active    |
      | 11 | 3         | Charlie     | 1        | Alice      | I want to buy this | active    |
    When I visit the notification page
    Then I should see a chat with "Bob"
    And I should see a chat with "Charlie"
    And I should see the message "Is this available?" for the chat with "Bob"

  @javascript
  Scenario: Displaying cancelled trade notifications
    Given the following chats exist for me:
      | id | seller_id | seller_name | buyer_id | buyer_name | last_message                             |
      | 12 | 1         | Alice       | 2        | Bob        | Bob has cancelled the trading of iPhone |
    When I visit the notification page
    Then I should see "CANCELLED" badge for the chat with "Bob"
    And the message for "Bob" should be styled as an error

  @javascript
  Scenario: Navigating to specific chat details
    Given the following chats exist for me:
      | id | seller_id | seller_name | buyer_id | buyer_name |
      | 10 | 1         | Alice       | 2        | Bob        |
    When I visit the notification page
    And I click on the chat with "Bob"
    Then I should be redirected to the chat page for chat ID "10"

  @javascript
  Scenario: Showing empty state when no chats exist
    Given I have no chats
    When I visit the notification page
    Then I should see "No messages yet."