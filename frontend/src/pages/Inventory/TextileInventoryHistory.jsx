import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiClock } from "react-icons/fi";

const TextileInventoryHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/inventory/textile/history`
        );
        setHistory(response.data);
      } catch (err) {
        console.error("Error fetching textile history:", err);
        setError("Failed to fetch textile history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">
          Loading History...
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
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6 flex items-center justify-center gap-2">
        Textile Inventory History
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">Textile Name</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No history records found.
                </td>
              </tr>
            ) : (
              history.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 transition"
                >
                  <td className="p-4">{record.textile.name}</td>
                  <td className="p-4">{record.quantity} Meters</td>
                  <td className="p-4">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        record.action === "entry"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {record.action.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TextileInventoryHistory;
