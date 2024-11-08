const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routes/bookRoutes");
const ApiError = require("./app/api-error");

const app = express();

//middeware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to book borrowing management application." });
});

// Đăng ký route vừa tạo với express app
app.use("/api/books", booksRouter);

// handle 404 response
app.use((req, res, next) => {
  // Code sẽ chạy khi không có route nào được định nghĩa
  return next(new ApiError(404, "Resource Not Found"));
});

// Định nghĩa middleware xử lý lỗi cuối sau khi app.use() và các route khác gọi
app.use((err, req, res, next) => {
  // Middleware xử lý lỗi tập trung.
  // Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
  return res.status(error.statusCode || 500).json({ 
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;