const mongoose = require("mongoose");

const MachineTypesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("MachineTypes", MachineTypesSchema);
