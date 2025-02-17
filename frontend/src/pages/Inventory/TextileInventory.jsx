import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2, FiSearch, FiLogIn, FiLogOut, FiClock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header";

const TextileInventory = () => {
  const [textiles, setTextiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTextile, setNewTextile] = useState({ name: "", quantity: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <Header />

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

      <div className="flex items-center justify-center text-blue-500 underline">
        <FiClock className="text-xl m-4" />
        <Link to="history"> Inventory History</Link>
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
                  <span className="text-xl font-semibold">
                    {textile.quantity} Meters
                  </span>

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

      <div className="flex justify-center items-center my-8 space-x-48">
        {/* Entry Button */}
        <button
          className="flex flex-col items-center px-6 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 transition transform hover:scale-105 shadow-md"
          onClick={() => navigate("add-textile")}
        >
          <FiLogIn className="text-3xl mb-1" />
          <span className="text-sm">Entry</span>
        </button>

        {/* Exit Button */}
        <button
          className="flex flex-col items-center px-6 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition transform hover:scale-105 shadow-md"
          onClick={() => navigate("remove-textile")}
        >
          <FiLogOut className="text-3xl mb-1" />
          <span className="text-sm">Exit</span>
        </button>
      </div>
    </div>
  );
};

export default TextileInventory;
