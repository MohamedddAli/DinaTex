import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaBoxes, FaWrench, FaTags } from "react-icons/fa"; // Importing icons from React Icons

const AdminHomePage = () => {
  return (
    <div className="admin-container min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-blue-800 mb-6 sm:mb-8">
        Admin Dashboard
      </h1>

      <div className="admin-options grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Employee Management */}
        <Link
          to="/admin/employees"
          className="admin-card bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:bg-blue-50 transition duration-200"
        >
          <FaUser className="text-3xl sm:text-4xl text-blue-600 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold">Manage Employees</h2>
          <p className="text-sm sm:text-base text-gray-500">
            Add, edit, or delete employee records.
          </p>
        </Link>

        {/* Machines Management */}
        <Link
          to="/admin/machines"
          className="admin-card bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:bg-blue-50 transition duration-200"
        >
          <FaCog className="text-3xl sm:text-4xl text-green-600 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold">Manage Machines</h2>
          <p className="text-sm sm:text-base text-gray-500">
            Add, edit, or delete machine data.
          </p>
        </Link>

        {/* Machine Types */}
        <Link
          to="/admin/machine-types"
          className="admin-card bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:bg-blue-50 transition duration-200"
        >
          <FaBoxes className="text-3xl sm:text-4xl text-indigo-600 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold">Machine Types</h2>
          <p className="text-sm sm:text-base text-gray-500">
            View and manage different machine types.
          </p>
        </Link>

        {/* Spare Parts Inventory */}
        <Link
          to="/admin/spare-parts"
          className="admin-card bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:bg-blue-50 transition duration-200"
        >
          <FaWrench className="text-3xl sm:text-4xl text-orange-600 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold">
            Spare Parts Inventory
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Manage the spare parts stock.
          </p>
        </Link>

        {/* Textile Inventory */}
        <Link
          to="/admin/textile-inventory"
          className="admin-card bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:bg-blue-50 transition duration-200"
        >
          <FaTags className="text-3xl sm:text-4xl text-purple-600 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold">
            Textile Inventory
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Add, edit, or delete textile inventory.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminHomePage;
