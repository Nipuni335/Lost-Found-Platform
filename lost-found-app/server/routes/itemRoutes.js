const router = require("express").Router();
const {
  createItem,
  getItems,
  getItem,
  deleteItem
} = require("../controllers/itemController");

router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItem);
router.delete("/:id", deleteItem);

module.exports = router;