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
  },
  rating: {
    type: Number,
  },
  assignedMachines: [
    { type: mongoose.Schema.Types.ObjectId, ref: "WeavingMachine" },
  ],
});

const Weaver = mongoose.model("Weaver", WeaverSchema);

module.exports = Weaver;
