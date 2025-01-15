const express = require("express");
const router = express.Router();

const {
  getMachines,
  getMachinesTypes,
  addMachineType,
  deleteMachineType,
} = require("../controllers/machines");

router.get("/", getMachines);

router.get("/types", getMachinesTypes);

router.post("/types", addMachineType);

router.delete("/types/:id", deleteMachineType);

module.exports = router;
