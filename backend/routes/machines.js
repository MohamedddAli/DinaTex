const express = require("express");
const router = express.Router();

const { getMachines, getMachinesTypes } = require("../controllers/machines");

router.get("/", getMachines);

router.get("/types", getMachinesTypes);

module.exports = router;
