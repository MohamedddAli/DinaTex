const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TextileInventoryHistorySchema = new Schema({
  textile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Textile",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  action: {
    type: String,
    enum: ["entry", "exit"],
    required: true,
  },
});

module.exports = mongoose.model(
  "TextileInventoryHistory",
  TextileInventoryHistorySchema
);
