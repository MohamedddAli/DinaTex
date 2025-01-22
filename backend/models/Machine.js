const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  weavingMachines: [
    { type: mongoose.Schema.Types.ObjectId, ref: "WeavingMachine" },
  ],
  Sadaya: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sadaya" }],
  Matwa: [{ type: mongoose.Schema.Types.ObjectId, ref: "Matwa" }],
});

const Machine = mongoose.model("Machine", machineSchema);

module.exports = Machine;
