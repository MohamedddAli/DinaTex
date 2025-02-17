import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const AddWeavingMachine = () => {
  const [formData, setFormData] = useState({
    Number: "",
    Type: "",
    Model: "",
    MaterialTypeLoaded: "",
    MaterialQuantity: "",
    LoadingDate: "",
    MaintenanceCost: "",
    Weaver: "", // new field for selected weaver ID
  });
  const [weavers, setWeavers] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${backendUrl}/admin/machines/add-machine/weaving-machine`,
        formData
      );
      alert("Weaving machine added successfully!");
      navigate("/admin/machines"); // Redirect to machines list
    } catch (error) {
      console.error("Error adding weaving machine:", error);
      alert("Failed to add weaving machine. Please try again.");
    }
  };

  useEffect(() => {
    const fetchWeavers = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/admin/employees/get-weavers`
        );
        setWeavers(response.data);
      } catch (error) {
        console.error("Error fetching weavers:", error);
      }
    };
    fetchWeavers();
  }, [backendUrl]);

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl"
        >
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Add Weaving Machine
          </h1>
          {/* Machine Number */}
          <div className="mb-4">
            <label
              htmlFor="Number"
              className="block text-lg font-semibold mb-2"
            >
              Machine Number
            </label>
            <input
              type="number"
              id="Number"
              name="Number"
              value={formData.Number}
              onChange={handleInputChange}
              placeholder="Enter machine number"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {/* Machine Type */}
          <div className="mb-4">
            <label htmlFor="Type" className="block text-lg font-semibold mb-2">
              Machine Type
            </label>
            <input
              type="text"
              id="Type"
              name="Type"
              value={formData.Type}
              onChange={handleInputChange}
              placeholder="Enter machine type"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {/* Model */}
          <div className="mb-4">
            <label htmlFor="Model" className="block text-lg font-semibold mb-2">
              Model
            </label>
            <input
              type="text"
              id="Model"
              name="Model"
              value={formData.Model}
              onChange={handleInputChange}
              placeholder="Enter model name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {/* Material Type Loaded */}
          <div className="mb-4">
            <label
              htmlFor="MaterialTypeLoaded"
              className="block text-lg font-semibold mb-2"
            >
              Material Type Loaded
            </label>
            <input
              type="text"
              id="MaterialTypeLoaded"
              name="MaterialTypeLoaded"
              value={formData.MaterialTypeLoaded}
              onChange={handleInputChange}
              placeholder="Enter material type"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {/* Material Quantity */}
          <div className="mb-4">
            <label
              htmlFor="MaterialQuantity"
              className="block text-lg font-semibold mb-2"
            >
              Material Quantity (Meters)
            </label>
            <input
              type="number"
              id="MaterialQuantity"
              name="MaterialQuantity"
              value={formData.MaterialQuantity}
              onChange={handleInputChange}
              placeholder="Enter material quantity"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {/* Loading Date */}
          <div className="mb-4">
            <label
              htmlFor="LoadingDate"
              className="block text-lg font-semibold mb-2"
            >
              Loading Date
            </label>
            <input
              type="text"
              id="LoadingDate"
              name="LoadingDate"
              placeholder="Enter loading date"
              value={formData.LoadingDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {/* Maintenance Cost */}
          <div className="mb-4">
            <label
              htmlFor="MaintenanceCost"
              className="block text-lg font-semibold mb-2"
            >
              Maintenance Cost (EGP)
            </label>
            <input
              type="number"
              id="MaintenanceCost"
              name="MaintenanceCost"
              value={formData.MaintenanceCost}
              onChange={handleInputChange}
              placeholder="Enter maintenance cost"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Weaver Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="weaver"
              className="block text-lg font-semibold mb-2"
            >
              Select Weaver
            </label>
            <select
              id="Weaver"
              name="Weaver"
              value={formData.Weaver}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a weaver</option>
              {weavers.map((weaver) => (
                <option key={weaver._id} value={weaver._id}>
                  {weaver.name}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Add Machine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWeavingMachine;
