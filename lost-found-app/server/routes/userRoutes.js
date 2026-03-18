const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", userController.getUsers);
router.post("/create-admin", userController.createAdmin);
router.put("/update/:id", userController.updateProfile);

module.exports = router;