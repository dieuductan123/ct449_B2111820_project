// models/Docgia.js
const mongoose = require("mongoose");

const ReaderSchema = new mongoose.Schema({
  maDocGia: { type: String, required: true, unique: true },
  hoLot: { type: String, required: true },
  ten: { type: String, required: true },
  ngaySinh: { type: Date },
  phai: { type: String },
  diaChi: { type: String },
  dienThoai: { type: String },
});

module.exports = mongoose.model("Reader", ReaderSchema);
