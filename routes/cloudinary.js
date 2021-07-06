const express = require("express");
const { upload, remove } = require("../controllers/cloudinaryController");
const router = express.Router();

const { authCheck, adminCheck } = require("../middleware/authMiddleware");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

module.exports = router;
