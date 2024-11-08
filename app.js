const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routes/bookRoutes");
const app = express();

//middeware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to book borrowing management application." });
});

// Đăng ký route vừa tạo với express app
app.use("/api/books", booksRouter);

module.exports = app;