// config/database.js
const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    // Kết nối tới MongoDB với URL từ biến môi trường
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully...");
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
