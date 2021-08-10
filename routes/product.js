const express = require("express");

const {
  create,
  listAll,
  list,
  remove,
  read,
  update,
  productsCount,
} = require("../controllers/productController");
const { authCheck, adminCheck } = require("../middleware/authMiddleware");

const router = express.Router();

//routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);
router.put("/product/:slug", authCheck, adminCheck, update);
router.get("/products/:count", listAll);
router.delete("/products/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);

router.post("/products", list);

module.exports = router;
