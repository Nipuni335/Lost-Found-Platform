const upload = require("../middleware/upload");
const router = require("express").Router();
const {
  createItem,
  getItems,
  getItemById,
  deleteItem
} = require("../controllers/itemController");

router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.delete("/:id", deleteItem);
router.post("/", upload.single("image"), createItem);

module.exports = router;