import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RemoveTextile = () => {
  const [textiles, setTextiles] = useState([]);
  const [selectedTextile, setSelectedTextile] = useState("");
  const [quantityToRemove, setQuantityToRemove] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch available textiles
  useEffect(() => {
    const fetchTextiles = async () => {
      try {
        const response = await axios.get(`${backendUrl}/inventory/textile`);
        setTextiles(response.data);
      } catch (err) {
        console.error("Error fetching textiles:", err);
        setError("Failed to fetch textiles.");
      }
    };
    fetchTextiles();
  }, [backendUrl]);

  const handleTextileChange = (e) => {
    setSelectedTextile(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantityToRemove(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTextile || quantityToRemove <= 0) {
      setError("Please select a textile and enter a valid quantity.");
      return;
    }

    try {
      const response = await axios.patch(`${backendUrl}/inventory/textile`, {
        name: selectedTextile,
        quantity: quantityToRemove,
      });
      setSuccess("Quantity removed successfully!");
      setError(null); // Clear any previous errors
      setQuantityToRemove(0); // Reset quantity field
      navigate("/admin/textile-inventory"); // Redirect to inventory page
    } catch (err) {
      setError("Error removing quantity.");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Remove Textile Quantity
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8"
      >
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">
            Select Textile
          </label>
          <select
            value={selectedTextile}
            onChange={handleTextileChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select a Textile</option>
            {textiles.map((textile) => (
              <option key={textile._id} value={textile.name}>
                {textile.name}
              </option>
            ))}
          </select>
          {selectedTextile && (
            <p className="text-sm text-gray-500 mt-1">
              Available Quantity:{" "}
              {textiles.find((t) => t.name === selectedTextile)?.quantity || 0}{" "}
              Meters
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">
            Quantity to Remove
          </label>
          <input
            type="number"
            value={quantityToRemove}
            onChange={handleQuantityChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            min="1"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition"
        >
          Remove Quantity
        </button>
      </form>
    </div>
  );
};

export default RemoveTextile;
