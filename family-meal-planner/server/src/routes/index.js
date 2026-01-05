const express = require("express");
const membersRouter = require("./members");
const mealsRouter = require("./meals");
const plansRouter = require("./plans");
const shoppingRouter = require("./shopping");

const router = express.Router();

router.use("/members", membersRouter);
router.use("/meals", mealsRouter);
router.use("/plans", plansRouter);
router.use("/shopping", shoppingRouter);

module.exports = router;
