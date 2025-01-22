import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditWeavingMachine = () => {
  const { id } = useParams(); // Extract the machine ID from the URL
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    Number: "",
    Type: "",
    Model: "",
    MaterialTypeLoaded: "",
    MaterialQuantity: "",
    LoadingDate: "",
    MaintenanceCost: "",
  });

  // Fetch the machine data on component mount
  useEffect(() => {
    const fetchMachineData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/admin/machines/weaving-machines/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching machine data:", error);
      }
    };

    fetchMachineData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${backendUrl}/admin/machines/weaving-machines/${id}`,
        formData
      );
      alert("Machine updated successfully!");
      navigate("/admin/machines"); // Redirect back to the machines list
    } catch (error) {
      console.error("Error updating machine:", error);
      alert("Failed to update machine. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Edit Weaving Machine
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Number */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Number</label>
          <input
            type="text"
            name="Number"
            value={formData.Number}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Type</label>
          <input
            type="text"
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* Model */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Model</label>
          <input
            type="text"
            name="Model"
            value={formData.Model}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* MaterialTypeLoaded */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Material Type Loaded
          </label>
          <input
            type="text"
            name="MaterialTypeLoaded"
            value={formData.MaterialTypeLoaded}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* MaterialQuantity */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Material Quantity (kg)
          </label>
          <input
            type="number"
            name="MaterialQuantity"
            value={formData.MaterialQuantity}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* LoadingDate */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Loading Date</label>
          <input
            type="text"
            name="LoadingDate"
            value={formData.LoadingDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* MaintenanceCost */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Maintenance Cost ($)
          </label>
          <input
            type="number"
            name="MaintenanceCost"
            value={formData.MaintenanceCost}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWeavingMachine;
