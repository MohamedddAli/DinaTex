import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const MachinesManagement = () => {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Fetch all machines data from the backend
    const fetchMachines = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/machines`); // Adjust the URL as necessary
        setMachines(response.data);
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    fetchMachines();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/machines/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/machines/${id}`); // Adjust the URL as necessary
      setMachines(machines.filter((machine) => machine._id !== id)); // Remove deleted machine from state
    } catch (error) {
      console.error("Error deleting machine:", error);
    }
  };

  const handleAddMachine = () => {
    navigate("/admin/machines/add-machine");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Machines Management
      </h1>

      {/* Add Machine Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddMachine}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Machine
        </button>
      </div>

      {/* Machines List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((machine) => (
          <div key={machine._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              {machine.type}
            </h3>

            {/* Conditional Rendering Based on Machine Type */}
            {machine.type === "WeavingMachine" && (
              <div>
                <h4 className="font-semibold">
                  Model: {machine.WeavingMachineData.Model}
                </h4>
                <p>Material: {machine.WeavingMachineData.MaterialTypeLoaded}</p>
                <p>
                  Quantity: {machine.WeavingMachineData.MaterialQuantity} kg
                </p>
                <p>
                  Maintenance Cost: $
                  {machine.WeavingMachineData.MaintenanceCost}
                </p>
              </div>
            )}

            {machine.type === "Matwa" && (
              <div>
                <h4 className="font-semibold">
                  Engine Type: {machine.MatwaData.engineType}
                </h4>
                <p>Weight: {machine.MatwaData.weight} kg</p>
                {/* Other specific fields for Matwa */}
              </div>
            )}

            {machine.type === "Sadaya" && (
              <div>
                <h4 className="font-semibold">
                  Max Speed: {machine.SadayaData.maxSpeed} km/h
                </h4>
                <p>Material: {machine.SadayaData.material}</p>
                {/* Other specific fields for Sadaya */}
              </div>
            )}

            {/* Edit and Delete Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(machine._id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={() => handleDelete(machine._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachinesManagement;
