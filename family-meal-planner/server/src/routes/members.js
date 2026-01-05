const express = require("express");
const membersController = require("../controllers/membersController");

const router = express.Router();

router.get("/", membersController.getMembers);
router.post("/", membersController.createMember);

module.exports = router;
