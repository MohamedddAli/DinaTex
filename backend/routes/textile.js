const express = require("express");
const {
  getTextiles,
  getTextileById,
  createTextile,
  updateTextile,
  deleteTextile,
} = require("../controllers/textile");

const router = express.Router();

router.get("/", getTextiles);
router.get("/:id", getTextileById);
router.post("/", createTextile);
router.put("/:id", updateTextile);
router.delete("/:id", deleteTextile);

module.exports = router;
