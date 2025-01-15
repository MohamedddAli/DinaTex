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
      <Route path="/admin/machines/add-machine" element={<AddMachine />} />
      <Route path="/admin/spare-parts" element={<SparePartsInventory />} />
      <Route path="/admin/textile-inventory" element={<TextileInventory />} />
    </Routes>
  );
};

export default App;
