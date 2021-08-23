const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middleware/authMiddleware.js");

const { orders, orderStatus } = require("../controllers/adminController");

router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = router;
