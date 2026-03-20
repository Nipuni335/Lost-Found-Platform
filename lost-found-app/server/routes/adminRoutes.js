const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminController");

router.get("/dashboard", getAdminStats);

module.exports = router;