const SparePart = require("../models/SparePart");

exports.addSparePart = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    if (!name || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Name and quantity are required" });
    }
    const newPart = await SparePart.create({ name, quantity });
    res.status(201).json(newPart);
  } catch (error) {
    res.status(500).json({ message: "Error adding spare part" });
  }
};

// Fetch all spare parts
exports.getAllSpareParts = async (req, res) => {
  try {
    const spareParts = await SparePart.find();
    res.json(spareParts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching spare parts" });
  }
};

// Update spare part quantity
exports.updateSparePartById = async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedPart = await SparePart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    res.json(updatedPart);
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity" });
  }
};

exports.deleteSparePartById = async (req, res) => {
  try {
    const deletedPart = await SparePart.findByIdAndDelete(req.params.id);
    if (!deletedPart) {
      return res.status(404).json({ message: "Spare part not found" });
    }
    res.json({ message: "Spare part deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting spare part" });
  }
};
