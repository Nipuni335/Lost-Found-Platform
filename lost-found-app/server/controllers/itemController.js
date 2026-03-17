const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
};

exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.getItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};