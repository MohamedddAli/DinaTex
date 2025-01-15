import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";

export const MachineTypes = () => {
  const [machineTypes, setMachineTypes] = useState([]);
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch machine types from the backend
  useEffect(() => {
    const fetchMachineTypes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/machines/types`);
        setMachineTypes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching machine types:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMachineTypes();
  }, []);

  // Handle adding a new machine type
  const handleAddType = async () => {
    if (!newType.trim()) {
      alert("Type name cannot be empty!");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/admin/machines/types`, {
        type: newType,
      });
      setMachineTypes([...machineTypes, response.data]); // Assuming the response returns the full object with _id and type
      setNewType(""); // Reset input field
    } catch (error) {
      console.error("Error adding new type:", error);
      alert("Failed to add new machine type.");
    }
  };

  // Handle deleting a machine type
  const handleDeleteType = async (_id) => {
    if (!window.confirm(`Are you sure you want to delete this machine type?`))
      return;
    try {
      await axios.delete(`${backendUrl}/admin/machines/types/${_id}`);
      setMachineTypes(machineTypes.filter((type) => type._id !== _id));
    } catch (error) {
      console.error("Error deleting type:", error);
      alert("Failed to delete machine type.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Machine Types Management
      </h1>

      {/* Add New Type */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <input
          type="text"
          placeholder="Add new machine type"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 mb-4 sm:mb-0 sm:mr-4"
        />
        <button
          onClick={handleAddType}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Type
        </button>
      </div>

      {/* Display Machine Types */}
      {loading ? (
        <p className="text-center text-gray-500">Loading machine types...</p>
      ) : machineTypes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {machineTypes.map((type) => (
            <div
              key={type._id} // Use _id as the key for unique identification
              className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
            >
              <span className="text-lg font-semibold text-blue-600">
                {type.type} {/* Display the machine type */}
              </span>
              <button
                onClick={() => handleDeleteType(type._id)} // Pass the _id to delete the specific type
                className="text-red-600 hover:text-red-800 transition duration-200"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No machine types available.</p>
      )}
    </div>
  );
};

export default MachineTypes;
