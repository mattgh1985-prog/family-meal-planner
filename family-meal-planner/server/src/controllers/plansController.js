const { plans } = require("../data/mockData");

exports.getPlansForWeek = (req, res) => {
  const { weekStart } = req.query;
  if (!weekStart) {
    return res
      .status(400)
      .json({ error: "weekStart query param required (YYYY-MM-DD)" });
  }

  const filtered = plans.filter((p) => p.weekStart === weekStart);
  res.json(filtered);
};

exports.createOrUpdatePlan = (req, res) => {
  const { memberId, weekStart, preferences, weeklyBudget } = req.body;

  if (!memberId || !weekStart) {
    return res
      .status(400)
      .json({ error: "memberId and weekStart are required" });
  }

  const existing = plans.find(
    (p) => p.memberId === memberId && p.weekStart === weekStart
  );

  if (existing) {
    existing.preferences = preferences || existing.preferences;
    existing.weeklyBudget =
      weeklyBudget !== undefined ? weeklyBudget : existing.weeklyBudget;
    return res.json(existing);
  }

  const newPlan = {
    id: plans.length ? plans[plans.length - 1].id + 1 : 1,
    memberId,
    weekStart,
    preferences: preferences || [],
    weeklyBudget: weeklyBudget || null
  };

  plans.push(newPlan);
  res.status(201).json(newPlan);
};
