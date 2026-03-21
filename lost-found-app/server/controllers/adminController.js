const Item = require("../models/Item");
const nodemailer = require("nodemailer");

const normalize = (value) => {
  return String(value || "").trim().toLowerCase();
};

const isMatch = (lostItem, foundItem) => {
  return (
    normalize(lostItem.title) === normalize(foundItem.title) &&
    normalize(lostItem.location) === normalize(foundItem.location) &&
    lostItem.status === "pending" &&
    foundItem.status === "pending"
  );
};

// GET matched and unmatched items
exports.getAdminMatches = async (req, res) => {
  try {
    const lostItems = await Item.find({
      type: "lost",
      status: "pending"
    }).sort({ createdAt: -1 });

    const foundItems = await Item.find({
      type: "found",
      status: "pending"
    }).sort({ createdAt: -1 });

    const matched = [];
    const usedLostIds = new Set();
    const usedFoundIds = new Set();

    for (const lost of lostItems) {
      for (const found of foundItems) {
        if (
          !usedLostIds.has(String(lost._id)) &&
          !usedFoundIds.has(String(found._id)) &&
          isMatch(lost, found)
        ) {
          matched.push({
            lostItem: lost,
            foundItem: found,
            matchScore: 90
          });

          usedLostIds.add(String(lost._id));
          usedFoundIds.add(String(found._id));
          break;
        }
      }
    }

    const unmatched = [
      ...lostItems.filter((item) => !usedLostIds.has(String(item._id))),
      ...foundItems.filter((item) => !usedFoundIds.has(String(item._id)))
    ];

    res.json({ matched, unmatched });
  } catch (error) {
    res.status(500).json({
      msg: "Error loading admin data",
      error: error.message
    });
  }
};

// INFORM USER
exports.informUserMatch = async (req, res) => {
  try {
    const { lostItemId, foundItemId } = req.body;

    if (!lostItemId) {
      return res.status(400).json({ msg: "Lost item ID is required" });
    }

    const lostItem = await Item.findById(lostItemId);
    const foundItem = foundItemId ? await Item.findById(foundItemId) : null;

    if (!lostItem) {
      return res.status(404).json({ msg: "Lost item not found" });
    }

    lostItem.isNotified = true;
    lostItem.status = "approved";
    await lostItem.save();

    if (foundItem) {
      foundItem.status = "approved";
      await foundItem.save();
    }

    res.json({ msg: "User informed successfully" });
  } catch (error) {
    res.status(500).json({
      msg: "Error informing user",
      error: error.message
    });
  }
};

// REMOVE MATCH OR SINGLE ITEM
exports.removeMatch = async (req, res) => {
  try {
    const { lostItemId, foundItemId } = req.body;

    if (!lostItemId && !foundItemId) {
      return res.status(400).json({ msg: "At least one item ID is required" });
    }

    if (lostItemId && foundItemId && lostItemId !== foundItemId) {
      const lostItem = await Item.findById(lostItemId);
      const foundItem = await Item.findById(foundItemId);

      if (!lostItem || !foundItem) {
        return res.status(404).json({ msg: "Items not found" });
      }

      lostItem.status = "removed";
      foundItem.status = "removed";

      await lostItem.save();
      await foundItem.save();

      return res.json({ msg: "Match removed successfully" });
    }

    const itemId = lostItemId || foundItemId;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    item.status = "removed";
    await item.save();

    res.json({ msg: "Item removed successfully" });
  } catch (error) {
    res.status(500).json({
      msg: "Error removing item",
      error: error.message
    });
  }
};