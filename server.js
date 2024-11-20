const app = require("./app");
const config = require("./app/config");


require('dotenv').config(); //Đọc các biến từ file .env
const connectDB = require('./app/config/database');

// Kết nối với MongoDB
connectDB();

// Start server
const PORT = config.app.port || 3000;
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}.`);
});

