import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const AddMachine = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Fetch machine types from the backend (assuming a GET request)
    const fetchMachineTypes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/machines/types`);
        setMachineTypes(response.data); // Assuming response.data contains { type, _id }
      } catch (error) {
        console.error("Error fetching machine types:", error);
      }
    };

    fetchMachineTypes();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Add New Machine
      </h1>

      <form className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Machine Type Dropdown */}
        <div className="mb-6">
          <label htmlFor="type" className="block text-xl font-semibold mb-2">
            Machine Type
          </label>
          <select
            id="type"
            value={selectedType}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
            required
          >
            <option value="">Select Machine Type</option>
            {machineTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.type} {/* Display the type value */}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default AddMachine;
