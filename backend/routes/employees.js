const express = require("express");
const router = express.Router();

const {
  addWeaver,
  getAllWeavers,
  deleteWeaverById,
} = require("../controllers/employees");

router.post("/add-weaver", addWeaver);

router.get("/get-weavers", getAllWeavers);

router.delete("/delete-weaver/:id", deleteWeaverById);

module.exports = router;
