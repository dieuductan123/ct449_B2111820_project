//models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  maSach: { type: String, required: true, unique: true },
  tenSach: { type: String, required: true },
  donGia: { type: Number, required: true },
  soQuyen: { type: Number, required: true },
  namXuatBan: { type: Number, required: true },
  maNXB: { type: String, required: true },
  tacGia: { type: String, required:true },
});

module.exports = mongoose.model('Book', BookSchema);