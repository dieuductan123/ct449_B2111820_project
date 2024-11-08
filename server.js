const app = require("./app");
const config = require("./app/config");

// Start server
const PORT = config.app.port;
require('dotenv').config(); //Đọc các biến từ file .env
const express = require('express');
const connectDB = require('./app/config/database');
const bookRoutes = require('./app/routes/bookRoutes');

// Kết nối với MongoDB
connectDB();

// Middleware để xử lý JSON
app.use(express.json());

// Định nghĩa các route ở đây
app.use('/api/books', bookRoutes);

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}.`);
});

