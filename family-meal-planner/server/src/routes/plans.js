const express = require("express");
const plansController = require("../controllers/plansController");

const router = express.Router();

router.get("/", plansController.getPlansForWeek);
router.post("/", plansController.createOrUpdatePlan);

module.exports = router;
