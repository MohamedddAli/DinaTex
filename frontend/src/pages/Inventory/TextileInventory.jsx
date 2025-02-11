import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2, FiSearch } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const TextileInventory = () => {
  const [textiles, setTextiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTextile, setNewTextile] = useState({ name: "", quantity: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch textiles from API
  useEffect(() => {
    const fetchTextiles = async () => {
      try {
        const response = await axios.get(`${backendUrl}/inventory/textile`);
        setTextiles(response.data);
      } catch (err) {
        console.error("Error fetching textiles:", err);
        setError("Failed to fetch textiles.");
      } finally {
        setLoading(false);
      }
    };
    fetchTextiles();
  }, [backendUrl]);

  // Update textile quantity
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 0) return;
    try {
      await axios.put(`${backendUrl}/inventory/textile/${id}`, {
        quantity: newQuantity,
      });
      setTextiles((prev) =>
        prev.map((textile) =>
          textile._id === id ? { ...textile, quantity: newQuantity } : textile
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Delete textile
  const deleteTextile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this textile?"))
      return;
    try {
      await axios.delete(`${backendUrl}/inventory/textile/${id}`);
      setTextiles(textiles.filter((textile) => textile._id !== id));
    } catch (error) {
      console.error("Error deleting textile:", error);
    }
  };

  // Handle input change for new textile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTextile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add new textile
  const addTextile = async (e) => {
    e.preventDefault();
    if (!newTextile.name || newTextile.quantity < 0) {
      alert("Please enter a valid name and quantity.");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/inventory/textile`,
        newTextile
      );
      setTextiles([...textiles, response.data]);
      setNewTextile({ name: "", quantity: 0 });
    } catch (error) {
      console.error("Error adding textile:", error);
    }
  };

  // Filter textiles based on search input
  const filteredTextiles = textiles.filter((textile) =>
    textile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">
          Loading Textiles...
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
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Textile Inventory
      </h1>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 mb-6 flex items-center space-x-3 border">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search Textile..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 flex-1 border-none focus:ring-0 focus:outline-none"
        />
      </div>

      {/* Textile List */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 overflow-scroll mb-6">
        {filteredTextiles.length === 0 ? (
          <p className="text-center text-gray-500">
            No matching textiles found.
          </p>
        ) : (
          <ul className="space-y-4 overflow-x-auto">
            {filteredTextiles.map((textile) => (
              <li
                key={textile._id}
                className="flex justify-between items-center p-4 rounded-md shadow-sm w-full bg-blue-50"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 ml-4">
                    {textile.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      updateQuantity(
                        textile._id,
                        Math.max(0, textile.quantity - 1)
                      )
                    }
                    className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition"
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="text-xl font-semibold">
                    {textile.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(textile._id, textile.quantity + 1)
                    }
                    className="px-3 py-1 bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 transition"
                  >
                    <AiOutlinePlus />
                  </button>
                  <button
                    onClick={() => deleteTextile(textile._id)}
                    className="px-3 py-1 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-700 transition flex items-center"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Textile Form */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-6 overflow-x-scroll">
        <form onSubmit={addTextile} className="flex flex-wrap space-x-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Textile Name"
            value={newTextile.name}
            onChange={handleInputChange}
            className="p-2 border rounded-md flex-1"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newTextile.quantity}
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
    </div>
  );
};

export default TextileInventory;
