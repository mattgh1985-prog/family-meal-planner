const members = [
  { id: 1, name: "Matt", email: "matt@example.com" },
  { id: 2, name: "Partner", email: "partner@example.com" },
  { id: 3, name: "Child 1", email: "child1@example.com" }
];

const meals = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    ingredients: [
      { name: "mince beef", quantity: "500g" },
      { name: "spaghetti", quantity: "500g" },
      { name: "tomato sauce", quantity: "1 jar" }
    ],
    nutrition: {
      calories: 650,
      protein: 30,
      carbs: 70,
      fat: 25
    }
  },
  {
    id: 2,
    name: "Chicken Stir Fry",
    ingredients: [
      { name: "chicken breast", quantity: "500g" },
      { name: "mixed veggies", quantity: "400g" },
      { name: "rice", quantity: "300g" }
    ],
    nutrition: {
      calories: 550,
      protein: 35,
      carbs: 60,
      fat: 15
    }
  }
];

const plans = [
  {
    id: 1,
    memberId: 1,
    weekStart: "2025-12-08",
    preferences: [
      {
        day: "Monday",
        mealType: "dinner",
        mealId: 1,
        notes: "Extra veggies"
      }
    ],
    weeklyBudget: 200
  }
];

module.exports = {
  members,
  meals,
  plans
};
