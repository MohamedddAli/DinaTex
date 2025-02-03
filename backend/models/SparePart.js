const mongoose = require("mongoose");

const SparePartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const SparePart = mongoose.model("SparePart", SparePartSchema);

module.exports = SparePart;
