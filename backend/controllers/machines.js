const Machine = require("../models/Machine");
const MachineTypes = require("../models/MachineTypes");
const WeavingMachine = require("../models/WeavingMachine");
const moment = require("moment");

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

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

    if (!Number || !Type || !Model || !MaterialTypeLoaded || !LoadingDate) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Create a new machine
    const newMachine = new WeavingMachine({
      Number,
      Type,
      Model,
      MaterialTypeLoaded,
      MaterialQuantity,
      LoadingDate,
      MaintenanceCost,
    });

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

exports.getWeavingMachineByID = async (req, res) => {
  const { id } = req.params;
  try {
    const machine = await WeavingMachine.findById(id);
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(200).json(machine);
  } catch (error) {
    console.error("Error getting weaving machine by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.editWeavingMachine = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the machine by ID
    const machine = await WeavingMachine.findById(id);
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    // Destructure the new data from the request body
    const {
      Number,
      Type,
      Model,
      MaterialTypeLoaded,
      MaterialQuantity,
      LoadingDate,
      MaintenanceCost,
    } = req.body;

    // Validate required fields
    if (!Number || !Type || !Model || !MaterialTypeLoaded || !LoadingDate) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Update machine properties
    machine.Number = Number;
    machine.Type = Type;
    machine.Model = Model;
    machine.MaterialTypeLoaded = MaterialTypeLoaded;
    machine.MaterialQuantity = MaterialQuantity || machine.MaterialQuantity; // Optional
    machine.LoadingDate = LoadingDate;
    machine.MaintenanceCost = MaintenanceCost || machine.MaintenanceCost; // Optional

    // Save the updated machine
    const updatedMachine = await machine.save();

    // Respond with the updated machine
    res.status(200).json({
      message: "Weaving Machine updated successfully",
      machine: updatedMachine,
    });
  } catch (error) {
    console.error("Error updating weaving machine:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
