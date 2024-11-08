//models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  bookName: { type: String, required: true },
  price: { type: Number },
  bookNum: { type: Number },
  yearPublish: { type: Number },
  publisherId: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
  author: { type: String },
});

module.exports = mongoose.model('Book', BookSchema);