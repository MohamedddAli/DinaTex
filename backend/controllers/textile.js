const Textile = require("../models/Textile");
const TextileInventoryHistory = require("../models/TextileInventoryHistory");

// @desc   Get all textiles
// @route  GET /api/textiles
exports.getTextiles = async (req, res) => {
  try {
    const textiles = await Textile.find();
    res.status(200).json(textiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching textiles", error });
  }
};

// @desc   Get single textile by ID
// @route  GET /api/textiles/:id
exports.getTextileById = async (req, res) => {
  try {
    const textile = await Textile.findById(req.params.id);
    if (!textile) return res.status(404).json({ message: "Textile not found" });
    res.status(200).json(textile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching textile", error });
  }
};

// @desc   Create a new textile
// @route  POST /api/textiles

exports.TextileEntry = async (req, res) => {
  const { name, quantity, date } = req.body;

  if (!name || quantity == null) {
    return res
      .status(400)
      .json({ message: "Please provide name and quantity" });
  }

  try {
    // Check if the textile already exists, case-insensitive search
    let existingTextile = await Textile.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    if (existingTextile) {
      // If the textile exists, increment the quantity
      existingTextile.quantity += quantity;
      await existingTextile.save(); // Save the updated textile
    } else {
      // If the textile doesn't exist, create a new instance
      existingTextile = new Textile({ name, quantity });
      await existingTextile.save();
    }

    // Use the provided date or default to the current date
    const entryDate = date ? new Date(date) : new Date();

    // Create and save the entry in TextileInventoryHistory
    const historyEntry = new TextileInventoryHistory({
      textile: existingTextile._id, // Reference to the textile
      quantity,
      date: entryDate, // Use provided date or current date
      action: "entry",
    });

    await historyEntry.save();

    res.status(201).json({ textile: existingTextile, history: historyEntry });
  } catch (error) {
    res.status(500).json({ message: "Error processing textile entry", error });
  }
};

exports.TextileExit = async (req, res) => {
  const { name, quantity } = req.body;

  if (!name || quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Please provide valid textile name and quantity" });
  }

  try {
    const textile = await Textile.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    if (!textile) {
      return res.status(404).json({ message: "Textile not found" });
    }

    if (textile.quantity < quantity) {
      return res.status(400).json({ message: "Not enough quantity to remove" });
    }

    // Decrease the quantity
    textile.quantity -= quantity;
    await textile.save();

    // Add to history log (Optional)
    const historyEntry = new TextileInventoryHistory({
      textile: textile._id,
      quantity: quantity, // Negative quantity for removal
      action: "exit",
      date: new Date(),
    });

    await historyEntry.save();

    res.status(200).json({ message: "Quantity removed successfully", textile });
  } catch (error) {
    res.status(500).json({ message: "Error removing textile quantity", error });
  }
};

// @desc   Update textile quantity
// @route  PUT /api/textiles/:id
exports.updateTextile = async (req, res) => {
  try {
    const updatedTextile = await Textile.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedTextile)
      return res.status(404).json({ message: "Textile not found" });
    res.status(200).json(updatedTextile);
  } catch (error) {
    res.status(500).json({ message: "Error updating textile", error });
  }
};

// @desc   Delete a textile
// @route  DELETE /api/textiles/:id
exports.deleteTextile = async (req, res) => {
  try {
    const deletedTextile = await Textile.findByIdAndDelete(req.params.id);
    if (!deletedTextile)
      return res.status(404).json({ message: "Textile not found" });
    res.status(200).json({ message: "Textile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting textile", error });
  }
};

exports.getTextileInventoryHistory = async (req, res) => {
  try {
    const history = await TextileInventoryHistory.find()
      .populate({
        path: "textile", // Ensure "textile" is the correct reference field
        select: "name", // Select only the name field from Textile
      })
      .sort({ date: -1 }); // Sort by newest entries first

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching textile history:", error);
    console.log(error);
    res.status(500).json({ message: "Error fetching textile history", error });
  }
};
