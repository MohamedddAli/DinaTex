// Import required modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize Express app
const app = express();
const cors = require("cors");

// Middleware to parse JSON requests and CORS
app.use(express.json());
app.use(cors());

//Routes
const machineRoutes = require("./routes/machines");
const employeeRoutes = require("./routes/employees");

// MongoDB connection and server startup
const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit process with failure
  }
};

// Call the function to start the server
startServer();

// Admins API Routes
app.use("/admin/machines", machineRoutes);
app.use("/admin/employees", employeeRoutes);
