const express = require("express");

const router = express.Router();

const { authCheck } = require("../middleware/authMiddleware");

const {
  userCart,
  getCart,
  emptyCart,
  saveAddress,
  applyCouponToCart,
  createOrder,
  createCashOrder,
  getOrders,
  addToWishList,
  wishList,
  removeFromWishList,
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

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToCart);

//order
router.post("/user/order", authCheck, createOrder); //Stripe
router.post("/user/cash-order", authCheck, createCashOrder); //Cash on Delivery
router.get("/user/orders", authCheck, getOrders);

//wishlist
router.post("/user/wishlist", authCheck, addToWishList);
router.get("/user/wishlist", authCheck, wishList);
router.put("/user/wishlist/:productId", authCheck, removeFromWishList);

module.exports = router;
