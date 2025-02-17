import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header";

const EditWeaver = () => {
  const { id } = useParams(); // Extract id from the URL
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State to store the weaver data
  const [weaver, setWeaver] = useState({
    name: "",
    age: "",
    residence: "",
    yearsOfExperience: "",
  });

  // Fetch the weaver data from the backend
  useEffect(() => {
    const fetchWeaver = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/admin/employees/get-weaver/${id}`
        );
        setWeaver(response.data); // Populate the form with fetched data
      } catch (error) {
        console.error("Error fetching weaver data:", error);
      }
    };

    fetchWeaver();
  }, [id, backendUrl]);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeaver((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to save changes
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${backendUrl}/admin/employees/edit-weaver/${id}`,
        weaver
      );
      alert("Weaver updated successfully!");
      navigate("/admin/employees"); // Redirect after saving
    } catch (error) {
      console.error("Error saving weaver data:", error);
      alert("Failed to update weaver.");
    }
  };

  return (
    <div className=" bg-gray-100 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Edit Weaver
      </h1>

      <form
        onSubmit={handleSave}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={weaver.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={weaver.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Residence Field */}
        <div className="mb-4">
          <label
            htmlFor="residence"
            className="block text-gray-700 font-bold mb-2"
          >
            Residence:
          </label>
          <input
            type="text"
            id="residence"
            name="residence"
            value={weaver.residence}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Years of Experience Field */}
        <div className="mb-4">
          <label
            htmlFor="yearsOfExperience"
            className="block text-gray-700 font-bold mb-2"
          >
            Years of Experience:
          </label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={weaver.yearsOfExperience}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWeaver;
