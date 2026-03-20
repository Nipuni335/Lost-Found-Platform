const Item = require("../models/Item");

exports.getAdminStats = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    const lostCount = items.filter((i) => i.type === "lost").length;
    const foundCount = items.filter((i) => i.type === "found").length;

    res.json({
      totalItems: items.length,
      lostCount,
      foundCount,
      items
    });
  } catch (error) {
    res.status(500).json({ msg: "Error loading admin dashboard", error: error.message });
  }
};