const Textile = require("../models/Textile");

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
exports.createTextile = async (req, res) => {
  const { name, quantity } = req.body;
  if (!name || quantity == null) {
    return res
      .status(400)
      .json({ message: "Please provide name and quantity" });
  }
  try {
    const newTextile = new Textile({ name, quantity });
    await newTextile.save();
    res.status(201).json(newTextile);
  } catch (error) {
    res.status(500).json({ message: "Error creating textile", error });
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
