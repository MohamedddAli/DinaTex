import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const AddWeaver = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [residence, setResidence] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWeaver = {
      name,
      age,
      residence,
      yearsOfExperience,
    };

    try {
      // Sending POST request to add the weaver
      await axios.post(`${backendUrl}/admin/employees/add-weaver`, newWeaver);
      setStatusMessage("Weaver added successfully!");
      setStatusType("success");
      // Redirect after successful creation
      setTimeout(() => {
        navigate("/admin/employees");
      }, 1500); // Redirect after a short delay to show the success message
    } catch (error) {
      console.error("Error adding weaver:", error);
      setStatusMessage("Error adding weaver. Please try again.");
      setStatusType("error");
    }
  };

  return (
    <div className=" bg-gray-100 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Add Weaver
      </h1>

      {/* Display success or error message */}
      {statusMessage && (
        <div
          className={`text-center p-4 mb-4 rounded-md flex  justify-center ${
            statusType === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="residence"
            className="block text-sm font-medium text-gray-700"
          >
            Residence
          </label>
          <input
            id="residence"
            type="text"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="yearsOfExperience"
            className="block text-sm font-medium text-gray-700"
          >
            Years of Experience
          </label>
          <input
            id="yearsOfExperience"
            type="number"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Weaver
        </button>
      </form>
    </div>
  );
};

export default AddWeaver;
