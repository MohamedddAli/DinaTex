const express = require("express");
const {
  getTextiles,
  getTextileById,
  createTextile,
  updateTextile,
  deleteTextile,
  TextileEntry,
  TextileExit,
  getTextileInventoryHistory,
} = require("../controllers/textile");

const router = express.Router();
// main route is "inventory/textile"
router.get("/", getTextiles);
router.get("/history", getTextileInventoryHistory);
router.post("/", TextileEntry);
router.patch("/", TextileExit);
router.put("/:id", updateTextile);
router.delete("/:id", deleteTextile);
router.get("/:id", getTextileById);

module.exports = router;
