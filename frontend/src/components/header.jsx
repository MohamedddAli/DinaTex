import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiHome } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white py-4 shadow-lg mb-6">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Home Button */}
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-lg font-semibold hover:text-gray-200 transition"
        >
          <FiHome className="text-2xl" />
          Home
        </button>

        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-blue-600 flex items-center justify-center font-bold text-xl rounded-full shadow-md">
            D
          </div>
          <h1 className="text-3xl font-bold tracking-wide">
            <span className="text-yellow-300">Dina</span>Tex
          </h1>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-lg font-semibold hover:text-gray-200 transition"
        >
          Logout
          <FiLogOut className="text-2xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;
