import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const AddMachine = () => {
  const [machineTypes, setMachineTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // String word (e.g., "WeavingMachine")
  const [selectedTypeId, setSelectedTypeId] = useState(""); // _id of the selected type
  const [formData, setFormData] = useState({
    type: "", // This will now hold the type _id
    WeavingMachineData: {},
    MatwaData: {},
    SadayaData: {},
  });

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

  // Handle changes in the dropdown selection
  const handleTypeChange = (e) => {
    const selectedTypeWord = e.target.options[e.target.selectedIndex].text;
    const selectedId = e.target.value;
    setSelectedType(selectedTypeWord); // Store the string word (e.g., "WeavingMachine")
    setSelectedTypeId(selectedId); // Store the _id value
    setFormData({ ...formData, type:   }); // Set the selected type _id in the form data
  };

  // Handle input changes dynamically
  const handleInputChange = (e, field, subField) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [subField]: e.target.value,
      },
    });
  };

  // Handle form submission to add a new machine
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/admin/machines`, formData); // Adjust URL as necessary
      navigate("/admin/machines"); // Redirect to the machines management page after submission
    } catch (error) {
      console.error("Error adding machine:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Add New Machine
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Machine Type Dropdown */}
        <div className="mb-6">
          <label htmlFor="type" className="block text-xl font-semibold mb-2">
            Machine Type
          </label>
          <select
            id="type"
            value={selectedType}
            onChange={handleTypeChange}
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

        {/* Dynamic Fields Based on Selected Machine Type */}
        {selectedType === "WeavingMachine" && (
          <>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Weaving Machine Details
            </h2>

            {/* Number */}
            <div className="mb-6">
              <label
                htmlFor="number"
                className="block text-lg font-semibold mb-2"
              >
                Number
              </label>
              <input
                type="number"
                id="number"
                value={formData.WeavingMachineData.Number || ""}
                onChange={(e) =>
                  handleInputChange(e, "WeavingMachineData", "Number")
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            {/* Type */}
            <div className="mb-6">
              <label
                htmlFor="type"
                className="block text-lg font-semibold mb-2"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                value={formData.WeavingMachineData.Type || ""}
                onChange={(e) =>
                  handleInputChange(e, "WeavingMachineData", "Type")
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            {/* Model */}
            <div className="mb-6">
              <label
                htmlFor="model"
                className="block text-lg font-semibold mb-2"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                value={formData.WeavingMachineData.Model || ""}
                onChange={(e) =>
                  handleInputChange(e, "WeavingMachineData", "Model")
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            {/* Material Type Loaded */}
            <div className="mb-6">
              <label
                htmlFor="materialType"
                className="block text-lg font-semibold mb-2"
              >
                Material Type Loaded
              </label>
              <input
                type="text"
                id="materialType"
                value={formData.WeavingMachineData.MaterialTypeLoaded || ""}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "WeavingMachineData",
                    "MaterialTypeLoaded"
                  )
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            {/* Material Quantity */}
            <div className="mb-6">
              <label
                htmlFor="materialQuantity"
                className="block text-lg font-semibold mb-2"
              >
                Material Quantity (kg)
              </label>
              <input
                type="number"
                id="materialQuantity"
                value={formData.WeavingMachineData.MaterialQuantity || ""}
                onChange={(e) =>
                  handleInputChange(e, "WeavingMachineData", "MaterialQuantity")
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            {/* Maintenance Cost */}
            <div className="mb-6">
              <label
                htmlFor="maintenanceCost"
                className="block text-lg font-semibold mb-2"
              >
                Maintenance Cost ($)
              </label>
              <input
                type="number"
                id="maintenanceCost"
                value={formData.WeavingMachineData.MaintenanceCost || ""}
                onChange={(e) =>
                  handleInputChange(e, "WeavingMachineData", "MaintenanceCost")
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>
          </>
        )}

        {selectedType === "Matwa" && (
          <>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Matwa Details
            </h2>
            <div className="mb-6">
              <label
                htmlFor="engineType"
                className="block text-lg font-semibold mb-2"
              >
                Engine Type
              </label>
              <input
                type="text"
                id="engineType"
                value={formData.MatwaData.engineType || ""}
                onChange={(e) =>
                  handleInputChange(e, "MatwaData", "engineType")
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="weight"
                className="block text-lg font-semibold mb-2"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={formData.MatwaData.weight || ""}
                onChange={(e) => handleInputChange(e, "MatwaData", "weight")}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>
          </>
        )}

        {selectedType === "Sadaya" && (
          <>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Sadaya Details
            </h2>
            <div className="mb-6">
              <label
                htmlFor="maxSpeed"
                className="block text-lg font-semibold mb-2"
              >
                Max Speed (km/h)
              </label>
              <input
                type="number"
                id="maxSpeed"
                value={formData.SadayaData.maxSpeed || ""}
                onChange={(e) => handleInputChange(e, "SadayaData", "maxSpeed")}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="material"
                className="block text-lg font-semibold mb-2"
              >
                Material
              </label>
              <input
                type="text"
                id="material"
                value={formData.SadayaData.material || ""}
                onChange={(e) => handleInputChange(e, "SadayaData", "material")}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-200 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Machine
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMachine;
