const express = require("express");
const shoppingController = require("../controllers/shoppingController");

const router = express.Router();

router.get("/", shoppingController.getShoppingList);

module.exports = router;
