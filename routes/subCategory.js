const express = require("express");

const {
  create,
  read,
  list,
  update,
  remove,
} = require("../controllers/subCategoryController");
const { authCheck, adminCheck } = require("../middleware/authMiddleware");

const router = express.Router();

//routes
router.post("/subcategory", authCheck, adminCheck, create);
router.get("/subcategory/:slug", read);
router.get("/subcategories", list);
router.put("/subcategory/:slug", authCheck, adminCheck, update);
router.delete("/subcategory/:slug", authCheck, adminCheck, remove);

module.exports = router;
