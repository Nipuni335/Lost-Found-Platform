const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  location: String,
  date: String,
  image: String,
  contactName: String,
  contactEmail: String,
  contactPhone: String,
});

module.exports = mongoose.model("Item", itemSchema);