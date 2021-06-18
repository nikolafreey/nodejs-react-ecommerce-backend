const express = require("express");

const router = express.Router();

router.get("/create-or-update-user", (req, res) => {
  res.json({
    data: "Hey you hit create or update endpoint in API",
  });
});

module.exports = router;
