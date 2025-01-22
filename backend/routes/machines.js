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
  getWeavingMachineByID,
  editWeavingMachine,
} = require("../controllers/machines");

router.get("/", getMachines);

router.get("/types", getMachinesTypes);

router.post("/types", addMachineType);

router.delete("/types/:id", deleteMachineType);

router.post("/add-machine/weaving-machine", addWeavingMachine);

router.get("/weaving-machines", getAllWeavingMachines);

router.delete("/weaving-machines/:id", deleteWeavingMachine);

router.get("/weaving-machines/:id", getWeavingMachineByID);

router.put("/weaving-machines/:id", editWeavingMachine);

module.exports = router;
