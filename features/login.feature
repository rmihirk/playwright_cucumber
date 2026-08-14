Feature: Login Functionality
  As a user
  I want to be able to login
  So that I can access my account

  @invalidlogin
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "<username>" and password "<password>"
    Then I can see login button is disabled

    Examples:
      | username | password |
      | invalid  | test123  |

  @validlogin
  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter username "<username>" and password "<password>"
    Then I can see login button is enabled

    Examples:
      | username      | password |
      | test@test.com | test123  |
      | test@test     | test123  |