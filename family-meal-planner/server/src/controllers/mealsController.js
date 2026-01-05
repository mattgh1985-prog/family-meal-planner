const { meals } = require("../data/mockData");

exports.getMeals = (req, res) => {
  res.json(meals);
};

exports.createMeal = (req, res) => {
  const { name, ingredients, nutrition } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Meal name is required" });
  }

  const newMeal = {
    id: meals.length ? meals[meals.length - 1].id + 1 : 1,
    name,
    ingredients: ingredients || [],
    nutrition: nutrition || null
  };

  meals.push(newMeal);
  res.status(201).json(newMeal);
};
