const { meals, plans } = require("../data/mockData");

function buildShoppingListForWeek(weekStart) {
  const weekPlans = plans.filter((p) => p.weekStart === weekStart);
  const ingredientsMap = new Map();

  weekPlans.forEach((plan) => {
    plan.preferences.forEach((pref) => {
      const meal = meals.find((m) => m.id === pref.mealId);
      if (!meal) return;

      (meal.ingredients || []).forEach((ing) => {
        const key = ing.name.toLowerCase();
        const existing = ingredientsMap.get(key) || [];
        existing.push(ing.quantity);
        ingredientsMap.set(key, existing);
      });
    });
  });

  return Array.from(ingredientsMap.entries()).map(([name, quantities]) => ({
    name,
    quantities
  }));
}

exports.getShoppingList = (req, res) => {
  const { weekStart } = req.query;

  if (!weekStart) {
    return res
      .status(400)
      .json({ error: "weekStart query param required (YYYY-MM-DD)" });
  }

  const list = buildShoppingListForWeek(weekStart);

  res.json({
    weekStart,
    items: list,
    pricingStatus: "not_implemented",
    freshnessRecommendationsStatus: "not_implemented"
  });
};
