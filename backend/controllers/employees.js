const Weaver = require("../models/Weaver");

exports.addWeaver = async (req, res) => {
  const { name, age, residence, yearsOfExperience } = req.body;

  try {
    const newWeaver = new Weaver({ name, age, residence, yearsOfExperience });
    await newWeaver.save();
    res.status(201).json(newWeaver);
  } catch (error) {
    console.error("Error adding weaver:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getAllWeavers = async (req, res) => {
  try {
    const weavers = await Weaver.find();
    res.status(200).json(weavers);
  } catch (error) {
    console.error("Error getting weavers:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteWeaverById = async (req, res) => {
  const { id } = req.params;

  try {
    await Weaver.deleteOne({ _id: id });
    res.status(200).json({ message: "Weaver deleted" });
  } catch (error) {
    console.error("Error deleting weaver:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
