import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const EmployeesManagement = () => {
  const [weavers, setWeavers] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [activeTab, setActiveTab] = useState("Weavers"); // Active tab state
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch data for Weavers
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

  // Fetch data for Administrators
  useEffect(() => {
    const fetchAdministrators = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/admin/employees/administrators`
        );
        setAdministrators(response.data);
      } catch (error) {
        console.error("Error fetching administrators:", error);
      }
    };

    fetchAdministrators();
  }, [backendUrl]);

  const handleEdit = (id) => {
    const editPath =
      activeTab === "Weavers"
        ? `/admin/employees/edit-weaver/${id}`
        : `/admin/employees/edit-administrator/${id}`;
    navigate(editPath);
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "Weavers") {
        await axios.delete(`${backendUrl}/admin/employees/delete-weaver/${id}`);
        setWeavers((prev) => prev.filter((employee) => employee._id !== id));
      } else if (type === "Administrators") {
        await axios.delete(
          `${backendUrl}/admin/employees/delete-administrator/${id}`
        );
        setAdministrators((prev) =>
          prev.filter((employee) => employee._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleAddEmployee = (employeeType) => {
    const addPath =
      employeeType === "Weavers"
        ? "/admin/employees/add-weaver"
        : "/admin/employees/add-administrator";
    navigate(addPath);
  };

  const renderEmployees = () => {
    const employees = activeTab === "Weavers" ? weavers : administrators;

    return employees.map((employee) => (
      <div key={employee._id} className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "Weavers" && (
          <div>
            <p>
              <strong>Name:</strong> {employee.name}
            </p>
            <p>
              <strong>Age:</strong> {employee.age}
            </p>
            <p>
              <strong>Residence:</strong> {employee.residence}
            </p>
            <p>
              <strong>Years Of Experience:</strong> {employee.yearsOfExperience}
            </p>
          </div>
        )}

        {activeTab === "Administrators" && (
          <div>
            <p>
              <strong>Department:</strong> {employee.department}
            </p>
            <p>
              <strong>Role Level:</strong> {employee.roleLevel}
            </p>
            <p>
              <strong>Office Location:</strong> {employee.officeLocation}
            </p>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleEdit(employee._id)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={() => handleDelete(employee._id, activeTab)}
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
        Employees Management
      </h1>

      <div className="flex justify-center space-x-4 mb-8">
        {["Weavers", "Administrators"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 font-bold text-lg rounded-lg ${
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

      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleAddEmployee(activeTab)}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center"
        >
          <FaPlus className="mr-2" /> Add {activeTab.slice(0, -1)}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderEmployees()}
      </div>
    </div>
  );
};

export default EmployeesManagement;
