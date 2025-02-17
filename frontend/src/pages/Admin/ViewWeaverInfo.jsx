import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header";

const ViewWeaverInfo = () => {
  const { id } = useParams(); // Get the Weaver ID from the URL
  const [weaver, setWeaver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchWeaver = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/admin/employees/get-weaver/${id}`
        );
        setWeaver(response.data); // The response now includes assigned machines
      } catch (err) {
        console.error("Error fetching weaver:", err);
        setError("Failed to fetch weaver information.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeaver();
  }, [id, backendUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">
          Loading Weaver Information...
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
      <Header />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Weaver Information
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weaver Details */}
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Name</h3>
            <p className="text-xl text-blue-600 font-medium">{weaver.name}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Age</h3>
            <p className="text-xl text-blue-600 font-medium">{weaver.age}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Residence</h3>
            <p className="text-xl text-blue-600 font-medium">
              {weaver.residence}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Years of Experience
            </h3>
            <p className="text-xl text-blue-600 font-medium">
              {weaver.yearsOfExperience}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Attendance</h3>
            <p className="text-xl text-blue-600 font-medium">
              {weaver.attendance || "No Data"}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">Rating</h3>
            <p className="text-xl text-blue-600 font-medium">
              {weaver.rating || "Not Rated"}
            </p>
          </div>
        </div>

        {/* Assigned Machines */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">
            Assigned Machines:
          </h3>
          <ul className="mt-4 space-y-2">
            {weaver.assignedMachines && weaver.assignedMachines.length > 0 ? (
              weaver.assignedMachines.map((machine) => (
                <li
                  key={machine._id}
                  className="bg-blue-50 p-4 rounded-md shadow-sm"
                >
                  <h4 className="text-lg font-semibold text-gray-700">
                    NOL: {machine.Number}
                  </h4>
                  <p className="text-md text-blue-600">Type: {machine.Type}</p>
                  <p className="text-md text-blue-600">
                    Model: {machine.Model}
                  </p>
                  {/* Add other machine details as needed */}
                </li>
              ))
            ) : (
              <p className="text-gray-600">No machines assigned.</p>
            )}
          </ul>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewWeaverInfo;
