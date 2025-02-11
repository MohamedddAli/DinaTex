import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaBoxes,
  FaWrench,
  FaTags,
  FaChartLine,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaTachometerAlt,
} from "react-icons/fa"; // Importing icons

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

        {/* Production Tracker */}
        <Link
          to="/admin/production-tracker"
          className="admin-card bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:bg-blue-50 transition duration-200"
        >
          <FaChartLine className="text-3xl sm:text-4xl text-red-600 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold">
            Production Tracker
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Monitor machine output and production efficiency.
          </p>
        </Link>

        {/* Attendance Tracker */}
        <Link
          to="/admin/attendance-tracker"
          className="admin-card bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:bg-blue-50 transition duration-200"
        >
          <FaCalendarCheck className="text-3xl sm:text-4xl text-teal-600 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold">
            Attendance Tracker
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Keep track of employee attendance and absences.
          </p>
        </Link>

        {/* Expense Tracker */}
        <Link
          to="/admin/expense-tracker"
          className="admin-card bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:bg-blue-50 transition duration-200"
        >
          <FaMoneyBillWave className="text-3xl sm:text-4xl text-yellow-600 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold">Expense Tracker</h2>
          <p className="text-sm sm:text-base text-gray-500">
            Track all factory expenses, including maintenance and purchases.
          </p>
        </Link>

        {/* NEW: Data Dashboard */}
        <Link
          to="/admin/data-dashboard"
          className="admin-card bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:bg-blue-50 transition duration-200"
        >
          <FaTachometerAlt className="text-3xl sm:text-4xl text-blue-600 mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold">Data Dashboard</h2>
          <p className="text-sm sm:text-base text-gray-500">
            Visualize key factory data with graphs and reports.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminHomePage;
