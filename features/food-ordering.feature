  
Feature: Food Menu Exploration and Cart Interactions

  Background:
    Given the user navigates to the Tomato App homepage

  Scenario: Verify homepage core elements and landing layout
    Then the header navigation should display "Home", "Menu", "Mobile App", and "Contact Us"
    And the main hero banner heading should read "Order your favourite food here"

   @focus
  Scenario Outline: Filter and verify dish prices by menu categories
    Given the user is looking at the "Explore our menu" section
    When the user selects the category "<Category>"
    Then the "Top dishes near you" section should display "<Dish>" for "<Price>"

    Examples:
      | Category | Dish             | Price |
      | Salad    | Green salad      | $12   |
      | Rolls    | Lasagna Rolls    | $14   |
      | Deserts  | Ripple Ice Cream | $14   |   
      | Sandwich | Chicken Sandwich | $12   |   
      | Cake     | Cup Cake         | $14   |
      | Pure Veg | Veg Salad        | $18   |
      | Pasta    | Cheese Pasta     | $12   |
      | Noodles  | Buttter Noodles  | $14   |

  Scenario: Verify company business contact info in footer
    When the user scrolls down to the "GET IN TOUCH" section
    Then the phone number should display "+1-206-844-1776"
    And the support email should display "contact@tomato.com"