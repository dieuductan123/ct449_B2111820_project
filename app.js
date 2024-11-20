require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
//const corsOptions = require('./app/config/cors');
const credentials = require('./app/middleware/credentials');
// const authenticationMiddleware = require('./middleware/authentication');
const errorhandlerMiddleware = require('./app/middleware/error_handler');

const booksRouter = require("./app/routes/bookRoutes");
const readerRoutes = require("./app/routes/readerRoutes");
const borrowRoutes = require("./app/routes/borrowRoutes");
const authRoutes = require("./app/routes/authRoutes");
const app = express();

//middeware
app.use(cors());
app.use(express.urlencoded({ extended: false })) // application.x-www-form-urlencoded
app.use(express.json()); // application response
app.use(cookieParser()); // application response

// static files
app.use('/static',express.static(path.join(__dirname, 'public')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRouter);
app.use('/api/readers', readerRoutes);
app.use('/api/borrow', borrowRoutes);

// Default error handler
app.use(errorhandlerMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to book borrowing management application." });
});

// Default error handler
app.all('*', (req, res) => {
  res.sendStatus(404)
})





module.exports = app;