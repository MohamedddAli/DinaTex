const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["WeavingMachine", "Matwa", "Sadaya"], // Define machine types
    required: true,
  },
  // Machine-specific fields based on type
  WeavingMachineData: {
    Number: { type: Number },
    Type: { type: String },
    Model: { type: String },
    MaterialTypeLoaded: { type: String },
    MaterialQuantity: { type: Number },
    LoadingDate: { type: Date },
    Maintenances: [
      {
        date: { type: Date },
        description: { type: String },
      },
    ],
    MaintenanceCost: { type: Number },
  },
  MatwaData: {
    weight: { type: Number },
    engineType: { type: String },
    // Other fields specific to type2
  },
  SadayaData: {
    maxSpeed: { type: Number },
    material: { type: String },
    // Other fields specific to type3
  },
});

const Machine = mongoose.model("Machine", machineSchema);

module.exports = Machine;
