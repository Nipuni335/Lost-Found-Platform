const express = require("express");
const router = express.Router();
const {
  getAdminMatches,
  informUserMatch,
  removeMatch
} = require("../controllers/adminController");

router.get("/matches", getAdminMatches);
router.post("/inform-user", informUserMatch);
router.post("/remove", removeMatch);

module.exports = router;