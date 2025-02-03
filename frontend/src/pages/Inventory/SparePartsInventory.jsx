import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi"; // Import delete icon

const SparePartsInventory = () => {
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPart, setNewPart] = useState({ name: "", quantity: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch spare parts
  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/inventory/spare-parts`);
        setSpareParts(response.data);
      } catch (err) {
        console.error("Error fetching spare parts:", err);
        setError("Failed to fetch spare parts.");
      } finally {
        setLoading(false);
      }
    };
    fetchSpareParts();
  }, [backendUrl]);

  // Update quantity
  const updateQuantity = async (id, newQuantity) => {
    try {
      await axios.patch(`${backendUrl}/inventory/spare-parts/${id}`, {
        quantity: newQuantity,
      });
      setSpareParts((prevParts) =>
        prevParts.map((part) =>
          part._id === id ? { ...part, quantity: newQuantity } : part
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Delete a spare part
  const deleteSparePart = async (id) => {
    if (!window.confirm("Are you sure you want to delete this spare part?")) {
      return;
    }
    try {
      await axios.delete(`${backendUrl}/inventory/spare-parts/${id}`);
      setSpareParts(spareParts.filter((part) => part._id !== id));
    } catch (error) {
      console.error("Error deleting spare part:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPart((prev) => ({ ...prev, [name]: value }));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add spare part
  const addSparePart = async (e) => {
    e.preventDefault();
    if (!newPart.name || newPart.quantity < 0) {
      alert("Please enter a valid name and quantity.");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/inventory/spare-parts`,
        newPart
      );
      setSpareParts([...spareParts, response.data]);
      setNewPart({ name: "", quantity: 0 });
    } catch (error) {
      console.error("Error adding spare part:", error);
    }
  };

  // Filter spare parts
  const filteredParts = spareParts.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">
          Loading Spare Parts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search Bar Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Spare Parts Inventory
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Spare Part..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
      </div>

      {/* Add Spare Part Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mb-6 overflow-x-scroll">
        <form
          onSubmit={addSparePart}
          className="flex flex-wrap space-x-4 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Spare Part Name"
            value={newPart.name}
            onChange={handleInputChange}
            className="p-2 border rounded-md flex-1"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newPart.quantity}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full sm:w-24"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 transition w-full sm:w-auto"
          >
            Add
          </button>
        </form>
      </div>

      {/* Spare Parts List Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 overflow-scroll">
        {filteredParts.length === 0 ? (
          <p className="text-center text-gray-500">
            No matching spare parts found.
          </p>
        ) : (
          <ul className="space-y-4 overflow-x-auto">
            {filteredParts.map((part) => (
              <li
                key={part._id}
                className="flex justify-between items-center bg-blue-50 p-4 rounded-md shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    {part.name}
                  </h3>
                  <p className="text-md text-gray-600">
                    Quantity: {part.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      updateQuantity(part._id, Math.max(0, part.quantity - 1))
                    }
                    className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{part.quantity}</span>
                  <button
                    onClick={() => updateQuantity(part._id, part.quantity + 1)}
                    className="px-3 py-1 bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => deleteSparePart(part._id)}
                    className="px-3 py-1 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-700 transition flex items-center"
                  >
                    <FiTrash2 className="text-lg" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SparePartsInventory;
