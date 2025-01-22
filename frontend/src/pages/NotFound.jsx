import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 px-4 py-8">
      {/* Icon */}
      <FaExclamationTriangle className="text-red-500 text-6rem md:text-8rem mb-4" />

      {/* Heading */}
      <h1 className="text-3rem md:text-4rem font-bold mb-2 text-center">
        404 - Page Not Found
      </h1>

      {/* Subtext */}
      <p className="text-lg mb-6 max-w-md text-center">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/admin")}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all text-base md:text-lg"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
