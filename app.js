const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routes/bookRoutes");
const readerRoutes = require("./app/routes/readerRoutes");
const borrowRoutes = require("./app/routes/borrowRoutes");
const app = express();

//middeware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to book borrowing management application." });
});

// Đăng ký route vừa tạo với express app
app.use("/api/books", booksRouter);
app.use('/api/readers', readerRoutes);
app.use('/api/borrow', borrowRoutes);

module.exports = app;