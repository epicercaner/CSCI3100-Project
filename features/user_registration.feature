Feature: User Registration with OTP Verification
  As a new student at CUHK
  I want to create an account using my university email
  So that I can join the marketplace community after verifying my identity

  Background:
    Given I am on the registration page

  Scenario: Successful two-step registration
    When I fill in the following registration details:
      | name             | Alice                       |
      | email            | 1155123456@link.cuhk.edu.hk |
      | password         | Password123!                |
      | confirm_password | Password123!                |
    And I click "Create Account"
    Then I should see the OTP verification popup
    And I should see "OTP sent! Please check your CUHK email mailbox."
    When I enter the valid OTP "123456"
    And I click "Verify & Register"
    Then I should see "Verification successful!"
    And I should be redirected to the account page

  Scenario: Registration failure due to password mismatch
    When I fill in the following registration details:
      | name             | Bob                         |
      | email            | 1155999888@link.cuhk.edu.hk |
      | password         | Password123!                |
      | confirm_password | DifferentPass789            |
    And I click "Create Account"
    Then I should see an error message "Passwords do not match."
    And the OTP popup should not appear

  Scenario: Attempting to register with an existing ID
    Given a user with email "1155000111@link.cuhk.edu.hk" already exists
    When I fill in the following registration details:
      | name             | Charlie                     |
      | email            | 1155000111@link.cuhk.edu.hk |
      | password         | Password123!                |
      | confirm_password | Password123!                |
    And I click "Create Account"
    Then I should see "This ID might already be registered."