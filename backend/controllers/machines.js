const Machine = require("../models/Machine");

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
    const types = Machine.schema.path("type").enumValues;
    res.status(200).json(types);
  } catch (error) {
    console.error("Error getting machine types:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
