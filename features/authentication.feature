@login
Feature: User Authentication Modal Popup Flow

  Scenario: Secure customer credential entry via header sign-in interaction
    Given the user navigates to the Tomato App homepage
    When the user clicks the "Sign In" button in the top header
    Then a login popup form with the title "Login" should appear
    And the user enters random email address using faker
    And the user enters random password using faker
    And user confirms agreement to terms checkbox
    And user clicks login submission button

 