const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", upload.single("image"), createItem);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);

module.exports = router;