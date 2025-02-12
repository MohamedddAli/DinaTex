const express = require("express");
const {
  getTextiles,
  getTextileById,
  createTextile,
  updateTextile,
  deleteTextile,
  TextileEntry,
  TextileExit,
} = require("../controllers/textile");

const router = express.Router();

router.get("/", getTextiles);
router.get("/:id", getTextileById);
router.post("/", TextileEntry);
router.patch("/", TextileExit);
router.put("/:id", updateTextile);
router.delete("/:id", deleteTextile);

module.exports = router;
