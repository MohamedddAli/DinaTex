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
import EditWeavingMachine from "./pages/Admin/EditWeavingMachine";
import AddWeaver from "./pages/Admin/AddWeaver";
import EditWeaver from "./pages/Admin/EditWeaver";
import ViewWeaverInfo from "./pages/Admin/ViewWeaverInfo";
import AddTextile from "./pages/Inventory/AddTextile";
import RemoveTextile from "./pages/Inventory/RemoveTextile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />

      {/* Parent route for Admin Home */}
      <Route path="/admin" element={<AdminHomePage />} />

      {/* Subroutes under /admin */}
      <Route path="/admin/employees" element={<EmployeesManagement />} />
      <Route
        path="/admin/employees/view-weaver-info/:id"
        element={<ViewWeaverInfo />}
      />
      <Route path="/admin/employees/add-weaver" element={<AddWeaver />} />
      <Route path="/admin/employees/edit-weaver/:id" element={<EditWeaver />} />
      <Route path="/admin/machines" element={<MachinesManagement />} />
      <Route
        path="/admin/machines/add-weavingmachine"
        element={<AddWeavingMachine />}
      />
      <Route
        path="/admin/machines/edit-weavingmachine/:id"
        element={<EditWeavingMachine />}
      />
      <Route path="/admin/machines/add-machine" element={<AddMachine />} />
      <Route path="/admin/spare-parts" element={<SparePartsInventory />} />
      <Route path="/admin/textile-inventory" element={<TextileInventory />} />

      <Route
        path="/admin/textile-inventory/add-textile"
        element={<AddTextile />}
      />

      <Route
        path="/admin/textile-inventory/remove-textile"
        element={<RemoveTextile />}
      />
    </Routes>
  );
};

export default App;
