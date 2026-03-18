const express = require("express");
const router = express.Router();

const {
  getAdminItems,
  getMatchedItems
} = require("../controllers/adminController");

router.get("/items", getAdminItems);
router.get("/match", getMatchedItems);

module.exports = router;