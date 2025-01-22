import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import NotFound from "./pages/NotFound";
import EmployeesManagement from "./pages/Admin/EmployeesManagement";
import MachinesManagement from "./pages/Admin/MachinesManagement";
import SparePartsInventory from "./pages/Inventory/SparePartsInventory";
import TextileInventory from "./pages/Inventory/TextileInventory";
import AddMachine from "./pages/Admin/AddMachine";
import MachineTypes from "./pages/Admin/MachineTypes";
import AddWeavingMachine from "./pages/Admin/AddWeavingMachine";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />

      {/* Parent route for Admin Home */}
      <Route path="/admin" element={<AdminHomePage />} />

      {/* Subroutes under /admin */}
      <Route path="/admin/employees" element={<EmployeesManagement />} />
      <Route path="/admin/machines" element={<MachinesManagement />} />
      <Route
        path="/admin/machines/add-weavingmachine"
        element={<AddWeavingMachine />}
      />
      <Route path="/admin/machines/add-machine" element={<AddMachine />} />
      <Route path="/admin/spare-parts" element={<SparePartsInventory />} />
      <Route path="/admin/textile-inventory" element={<TextileInventory />} />
      <Route path="/admin/machine-types" element={<MachineTypes />} />
    </Routes>
  );
};

export default App;
