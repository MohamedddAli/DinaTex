import React from "react";
import { FaIndustry, FaShippingFast, FaLeaf } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-8 px-4 sm:py-12 sm:px-8 md:py-16 md:px-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Welcome to DINA TEX
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6">
          Delivering top-quality textiles with sustainability and innovation.
        </p>
        <button className="px-6 py-2 sm:px-8 sm:py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-all">
          Learn More
        </button>
      </section>

      {/* About Us Section */}
      <section className="py-8 px-4 sm:py-12 sm:px-8 md:py-16 md:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <FaIndustry className="text-blue-600 text-5xl sm:text-6xl mb-4" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
              State-of-the-Art Facilities
            </h3>
            <p className="text-sm sm:text-base md:text-lg">
              Our cutting-edge machinery and skilled workforce ensure the
              highest quality textiles.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <FaShippingFast className="text-blue-600 text-5xl sm:text-6xl mb-4" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
              Global Distribution
            </h3>
            <p className="text-sm sm:text-base md:text-lg">
              We deliver to clients worldwide with unmatched efficiency and
              reliability.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <FaLeaf className="text-blue-600 text-5xl sm:text-6xl mb-4" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
              Eco-Friendly Practices
            </h3>
            <p className="text-sm sm:text-base md:text-lg">
              Sustainability is at the heart of our operations, ensuring a
              greener future.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-200 py-8 px-4 sm:py-12 sm:px-8 md:py-16 md:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          Get in Touch
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-6">
          Partner with us for premium textiles that meet your needs and exceed
          your expectations.
        </p>
        <button className="px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default Home;
