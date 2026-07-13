@reg
Feature: User Account Registration and Login

  Scenario: Register a new user and then log back in
    Given the user navigates to the Tomato App homepage
    # Registration Flow
    When the user clicks the "Sign In" button in the top header
    And the user switches to the sign-up form modal view
    And the user enters a random name using faker
    And the user enters a random registration email address using faker
    And the user enters a random registration password using faker
    And the user confirms the registration agreement checkbox
    Then the user clicks the "Create account" button to submit
    
    # Logout Flow
    When the user clicks the profile icon
    And the user clicks the "Logout" button
    
    # Login Flow
    When the user clicks the "Sign In" button in the top header
    And the user enters their registered email
    And the user enters their registered password
    And user confirms agreement to terms checkbox
    And user clicks login submission button
    Then the login process should be completed


    # --- ADDED: Order Flow ---
    When the user selects a "Top Dish" from the menu
    And the user adds the dish to the cart
    And the user clicks the cart icon
    When the user clicks the "Proceed to checkout" button
    Then the checkout page should be loaded

  # --- Delivery & Payment Flow ---
    And the user fills out the delivery information form
    When the user clicks the "PROCEED TO PAYMENT" button


       # --- Stripe ---
    Then the user should be redirected to Stripe checkout
    When the user fills out the Stripe payment form
    And the user clicks the Stripe pay button
    Then the order should be confirmed


  


 