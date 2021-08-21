const express = require("express");

const router = express.Router();

const { authCheck } = require("../middleware/authMiddleware");

const {
  userCart,
  getCart,
  emptyCart,
  saveAddress,
} = require("../controllers/userController");

// router.get("/user", (req, res) => {
//   res.json({
//     data: "Hey you hit user endpoint in API",
//   });
// });

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

module.exports = router;
