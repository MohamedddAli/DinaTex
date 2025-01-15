const Machine = require("../models/Machine");
const MachineTypes = require("../models/MachineTypes");

exports.getMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error) {
    console.error("Error getting machines:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getMachinesTypes = async (req, res) => {
  try {
    // Directly access the enum values from the schema
    const types = await MachineTypes.find();
    res.status(200).json(types);
  } catch (error) {
    console.error("Error getting machine types:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addMachineType = async (req, res) => {
  const { type } = req.body;

  try {
    // Check if the type already exists
    const existingType = await MachineTypes.findOne({ type });
    if (existingType) {
      return res.status(400).json({ message: "Type already exists" });
    }
    // Create a new type
    const newType = new MachineTypes({ type });
    await newType.save();
    res.status(201).json(newType);
  } catch (error) {
    console.error("Error adding machine type:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteMachineType = async (req, res) => {
  const { id } = req.params; // Now receiving _id as 'id'
  try {
    // Check if the type exists using the id
    const existingType = await MachineTypes.findById(id);
    if (!existingType) {
      return res.status(404).json({ message: "Machine type not found" });
    }
    // Delete the machine type by _id
    await MachineTypes.deleteOne({ _id: id });
    res.status(200).json({ message: "Machine type deleted" });
  } catch (error) {
    console.error("Error deleting machine type:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
