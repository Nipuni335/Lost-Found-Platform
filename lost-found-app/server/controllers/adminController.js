const Item = require("../models/Item");

// Get all items for admin
exports.getAdminItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Error loading items" });
  }
};

// Match lost and found items
exports.getMatchedItems = async (req, res) => {
  try {
    const items = await Item.find();

    const lostItems = items.filter(item => item.type === "lost");
    const foundItems = items.filter(item => item.type === "found");

    const matched = [];
    const unmatched = [];

    lostItems.forEach(lost => {
      const match = foundItems.find(found =>
        found.title.toLowerCase() === lost.title.toLowerCase() &&
        found.location.toLowerCase() === lost.location.toLowerCase()
      );

      if (match) {
        matched.push({ lost, found: match });
      } else {
        unmatched.push(lost);
      }
    });

    res.json({ matched, unmatched });

  } catch (err) {
    res.status(500).json({ msg: "Error matching items" });
  }
};