const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    date: {
      type: Date
    },
    image: {
      type: String,
      default: ""
    },
    contactName: {
      type: String,
      required: true
    },
    contactEmail: {
      type: String,
      required: true
    },
    contactPhone: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);