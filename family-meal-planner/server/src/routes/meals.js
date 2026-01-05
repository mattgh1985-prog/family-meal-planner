const express = require("express");
const mealsController = require("../controllers/mealsController");

const router = express.Router();

router.get("/", mealsController.getMeals);
router.post("/", mealsController.createMeal);

module.exports = router;
