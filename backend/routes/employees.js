const express = require("express");
const router = express.Router();

const {
  addWeaver,
  getAllWeavers,
  deleteWeaverById,
  getWeaverById,
  editWeaverById,
} = require("../controllers/employees");

router.post("/add-weaver", addWeaver);

router.get("/get-weavers", getAllWeavers);

router.delete("/delete-weaver/:id", deleteWeaverById);

router.get("/get-weaver/:id", getWeaverById);

router.put("/edit-weaver/:id", editWeaverById);

module.exports = router;
