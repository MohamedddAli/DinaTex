const express = require("express");
const router = express.Router();

const {
  getMachines,
  getMachinesTypes,
  addMachineType,
  deleteMachineType,
  addWeavingMachine,
  getAllWeavingMachines,
  deleteWeavingMachine,
} = require("../controllers/machines");

router.get("/", getMachines);

router.get("/types", getMachinesTypes);

router.post("/types", addMachineType);

router.delete("/types/:id", deleteMachineType);

router.post("/add-machine/weaving-machine", addWeavingMachine);

router.get("/weaving-machines", getAllWeavingMachines);

router.delete("/weaving-machines/:id", deleteWeavingMachine);

module.exports = router;
