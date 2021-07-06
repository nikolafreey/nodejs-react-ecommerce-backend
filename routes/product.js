const express = require("express");

const { create, read } = require("../controllers/productController");
const { authCheck, adminCheck } = require("../middleware/authMiddleware");

const router = express.Router();

//routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products", read);

module.exports = router;
