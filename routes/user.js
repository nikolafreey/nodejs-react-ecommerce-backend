const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "Hey you hit user endpoint in API",
  });
});

module.exports = router;
