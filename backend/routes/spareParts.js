const express = require("express");
const router = express.Router();

const {
  getAllSpareParts,
  addSparePart,
  updateSparePartById,
  deleteSparePartById,
} = require("../controllers/spareParts");

router.get("/", getAllSpareParts);
router.post("/", addSparePart);
router.patch("/:id", updateSparePartById);
router.delete("/:id", deleteSparePartById);

module.exports = router;
