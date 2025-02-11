const mongoose = require("mongoose");

const weavingMachineSchema = new mongoose.Schema({
  Number: { type: Number, required: true },
  Type: { type: String, required: true },
  Model: { type: String, required: true },
  MaterialTypeLoaded: { type: String, required: true },
  MaterialQuantity: { type: Number, required: true },
  LoadingDate: { type: String, required: true },
  Maintenances: [
    {
      date: { type: String },
      description: { type: String },
    },
  ],
  MaintenanceCost: { type: Number, default: 0 },
  Weaver: { type: mongoose.Schema.Types.ObjectId, ref: "Weaver" },
  Status: {
    type: String,
    enum: ["Working", "Maintenance"],
    required: true,
    default: "Working",
  },
});

const WeavingMachine = mongoose.model("WeavingMachine", weavingMachineSchema);

module.exports = WeavingMachine;
