const express = require("express");
const { createOrUpdateUser } = require("../controllers/authController");
const { authCheck } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;
