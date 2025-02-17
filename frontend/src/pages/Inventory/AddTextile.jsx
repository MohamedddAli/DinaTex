import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const AddTextile = () => {
  const [textiles, setTextiles] = useState([]);
  const [selectedTextile, setSelectedTextile] = useState("");
  const [newTextile, setNewTextile] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing textiles from the backend
    const fetchTextiles = async () => {
      try {
        const response = await axios.get(`${backendUrl}/inventory/textile`);
        setTextiles(response.data);
      } catch (err) {
        console.error("Error fetching textiles:", err);
        setError("Failed to load textiles.");
      } finally {
        setLoading(false);
      }
    };
    fetchTextiles();
  }, [backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((!selectedTextile && !newTextile) || quantity <= 0 || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const textileData = {
      name: selectedTextile || newTextile,
      quantity: parseInt(quantity, 10),
      date,
    };

    try {
      await axios.post(`${backendUrl}/inventory/textile`, textileData);
      alert("Textile entry added successfully!");
      navigate("/admin/textile-inventory"); // Redirect to home or inventory page
    } catch (error) {
      console.error("Error adding textile:", error);
      alert("Failed to add textile.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Add Textile Entry
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading textiles...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Existing Textile */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Select Existing Textile:
                </label>
                <select
                  value={selectedTextile}
                  onChange={(e) => {
                    setSelectedTextile(e.target.value);
                    setNewTextile(""); // Clear new textile input when selecting existing one
                  }}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">-- Choose a textile --</option>
                  {textiles.map((textile) => (
                    <option key={textile._id} value={textile.name}>
                      {textile.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Input New Textile Name (if not in the list) */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Or Enter New Textile:
                </label>
                <input
                  type="text"
                  value={newTextile}
                  onChange={(e) => {
                    setNewTextile(e.target.value);
                    setSelectedTextile(""); // Clear dropdown when entering new textile
                  }}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter new textile name"
                />
              </div>
              {/* Quantity Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Quantity (Meters):
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  min="1"
                  required
                />
              </div>
              {/* Date Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Entry Date:
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Add Textile Entry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTextile;
