import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const MachinesManagement = () => {
  const [weavingMachines, setWeavingMachines] = useState([]);
  const [matwaMachines, setMatwaMachines] = useState([]);
  const [sadayaMachines, setSadayaMachines] = useState([]);
  const [isLoadingWeaving, setIsLoadingWeaving] = useState(true);
  const [isLoadingMatwa, setIsLoadingMatwa] = useState(true);
  const [isLoadingSadaya, setIsLoadingSadaya] = useState(true);
  const [activeTab, setActiveTab] = useState("WeavingMachine"); // Active tab state
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch data for Weaving Machines
  useEffect(() => {
    const fetchWeavingMachines = async () => {
      setIsLoadingWeaving(true);
      try {
        const response = await axios.get(
          `${backendUrl}/admin/machines/weaving-machines`
        );
        setWeavingMachines(response.data);
      } catch (error) {
        console.error("Error fetching weaving machines:", error);
      }
      setIsLoadingWeaving(false);
    };

    fetchWeavingMachines();
  }, [backendUrl]);

  // Fetch data for Matwa Machines
  useEffect(() => {
    const fetchMatwaMachines = async () => {
      setIsLoadingMatwa(true);
      try {
        const response = await axios.get(
          `${backendUrl}/admin/machines/matwa-machines`
        );
        setMatwaMachines(response.data);
      } catch (error) {
        console.error("Error fetching matwa machines:", error);
      }
      setIsLoadingMatwa(false);
    };

    fetchMatwaMachines();
  }, [backendUrl]);

  // Fetch data for Sadaya Machines
  useEffect(() => {
    const fetchSadayaMachines = async () => {
      setIsLoadingSadaya(true);
      try {
        const response = await axios.get(
          `${backendUrl}/admin/machines/sadaya-machines`
        );
        setSadayaMachines(response.data);
      } catch (error) {
        console.error("Error fetching sadaya machines:", error);
      }
      setIsLoadingSadaya(false);
    };

    fetchSadayaMachines();
  }, [backendUrl]);

  const handleEdit = (id) => {
    navigate(`/admin/machines/edit-weavingmachine/${id}`);
  };

  const handleDelete = async (id, type) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this machine?"
    );
    if (!confirmDelete) return; // If user cancels, exit the function

    try {
      if (type === "WeavingMachine") {
        await axios.delete(
          `${backendUrl}/admin/machines/weaving-machines/${id}`
        );
        setWeavingMachines((prev) =>
          prev.filter((machine) => machine._id !== id)
        );
      } else if (type === "Matwa") {
        setMatwaMachines((prev) =>
          prev.filter((machine) => machine._id !== id)
        );
      } else if (type === "Sadaya") {
        setSadayaMachines((prev) =>
          prev.filter((machine) => machine._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting machine:", error);
    }
  };

  const handleAddMachine = (machineType) => {
    navigate(`/admin/machines/add-${machineType.toLowerCase()}`);
  };

  const renderMachines = () => {
    const machines =
      activeTab === "WeavingMachine"
        ? weavingMachines
        : activeTab === "Matwa"
        ? matwaMachines
        : sadayaMachines;

    const isLoading =
      activeTab === "WeavingMachine"
        ? isLoadingWeaving
        : activeTab === "Matwa"
        ? isLoadingMatwa
        : isLoadingSadaya;

    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-full">
          <p className="text-center text-lg text-blue-600 font-semibold animate-pulse">
            Loading {activeTab} Machines...
          </p>
        </div>
      );
    }

    return machines.map((machine) => (
      <div key={machine._id} className="bg-white p-6 rounded-lg shadow-md">
        {/* Render machine-specific details */}
        {activeTab === "WeavingMachine" && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
            {/* Machine Number */}
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              NOL {machine.Number}
            </h3>

            {/* Weaver Information */}
            <h2 className="text-lg text-gray-700 mb-2">
              <strong className="text-gray-800">Weaver:</strong>{" "}
              {machine.Weaver ? (
                <span className="text-green-600 font-medium">
                  <Link
                    to={`/admin/employees/view-weaver-info/${machine.Weaver._id}`} // Replace with your desired route
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {machine.Weaver.name}
                  </Link>
                </span>
              ) : (
                <span className="text-red-500 font-medium">
                  No Weaver Assigned
                </span>
              )}
            </h2>

            {/* Machine Type */}
            <h4 className="text-lg text-gray-700 mb-2">
              <strong className="text-gray-800">Type:</strong> {machine.Type}
            </h4>

            {/* Machine Details */}
            <div className="text-gray-600 space-y-2">
              <p>
                <strong className="text-gray-800">Model:</strong>{" "}
                {machine.Model}
              </p>
              <p>
                <strong className="text-gray-800">Material:</strong>{" "}
                {machine.MaterialTypeLoaded}
              </p>
              <p>
                <strong className="text-gray-800">Quantity:</strong>{" "}
                {machine.MaterialQuantity} kg
              </p>
              <p>
                <strong className="text-gray-800">Loaded Date:</strong>{" "}
                {machine.LoadingDate}
              </p>
              <p>
                <strong className="text-gray-800">Maintenance Cost:</strong>{" "}
                {machine.MaintenanceCost} EGP
              </p>
            </div>
          </div>
        )}

        {activeTab === "Matwa" && (
          <div>
            <h4 className="font-semibold">Engine Type: {machine.engineType}</h4>
            <p>Weight: {machine.weight} kg</p>
          </div>
        )}

        {activeTab === "Sadaya" && (
          <div>
            <h4 className="font-semibold">
              Max Speed: {machine.maxSpeed} km/h
            </h4>
            <p>Material: {machine.material}</p>
          </div>
        )}

        {/* Edit and Delete Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleEdit(machine._id)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={() => handleDelete(machine._id, activeTab)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Machines Management
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 overflow-x-scroll whitespace-nowrap mb-8">
        {["WeavingMachine", "Matwa", "Sadaya"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-bold text-base sm:text-lg rounded-lg inline-block ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition duration-200`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add Machine Button for Active Tab */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleAddMachine(activeTab)}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center"
        >
          <FaPlus className="mr-2" /> Add {activeTab}
        </button>
      </div>

      {/* Machines List for Active Tab */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderMachines()}
      </div>
    </div>
  );
};

export default MachinesManagement;
