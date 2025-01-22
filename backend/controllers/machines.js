const Machine = require("../models/Machine");
const MachineTypes = require("../models/MachineTypes");
const WeavingMachine = require("../models/WeavingMachine");

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

exports.addWeavingMachine = async (req, res) => {
  try {
    const {
      Number,
      Type,
      Model,
      MaterialTypeLoaded,
      MaterialQuantity,
      LoadingDate,
      MaintenanceCost,
    } = req.body;

    // Basic validation (optional, depends on your needs)
    if (!Number || !Type || !Model || !MaterialTypeLoaded || !LoadingDate) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Create a new machine using the model
    const newMachine = new WeavingMachine({
      Number,
      Type,
      Model,
      MaterialTypeLoaded,
      MaterialQuantity,
      LoadingDate,
      MaintenanceCost,
    });

    // Save the machine to the database
    await newMachine.save();
    res.status(201).json({
      message: "Weaving Machine added successfully!",
      machine: newMachine,
    });
  } catch (error) {
    console.error("Error adding weaving machine:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

exports.getAllWeavingMachines = async (req, res) => {
  try {
    const weavingMachines = await WeavingMachine.find();
    res.status(200).json(weavingMachines);
  } catch (error) {
    console.error("Error getting weaving machines:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteWeavingMachine = async (req, res) => {
  const { id } = req.params; // Now receiving _id as 'id'
  try {
    // Check if the machine exists using the id
    const existingMachine = await WeavingMachine.findById(id);
    if (!existingMachine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    // Delete the machine by _id
    await WeavingMachine.deleteOne({ _id: id });
    res.status(200).json({ message: "Machine deleted" });
  } catch (error) {
    console.error("Error deleting machine:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
