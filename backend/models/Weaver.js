const mongoose = require("mongoose");

const WeaverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  attendance: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Weaver = mongoose.model("Weaver", WeaverSchema);

module.exports = Weaver;
