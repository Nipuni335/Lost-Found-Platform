const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {
    const imagePath = req.file ? `uploads/${req.file.filename}` : "";

    const newItem = new Item({
      ...req.body,
      image: imagePath
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ msg: "Error creating item", error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching items", error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching item", error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `uploads/${req.file.filename}`;
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    if (!updatedItem) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ msg: "Error updating item", error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ msg: "Item not found" });
    }

    res.json({ msg: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting item", error: error.message });
  }
};