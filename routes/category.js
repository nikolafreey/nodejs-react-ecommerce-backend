const express = require("express");

const {
  create,
  read,
  list,
  update,
  remove,
} = require("../controllers/categoryController");
const { authCheck, adminCheck } = require("../middleware/authMiddleware");

const router = express.Router();

//routes
router.post("/category", authCheck, adminCheck, create);
router.get("/category/:slug", read);
router.get("/categories", list);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;
