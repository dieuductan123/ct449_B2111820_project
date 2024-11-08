// models/TheoDoiMuonSach.js
const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  maDocGia: { type: String, required: true },
  maSach: { type: String, required: true },
  ngayMuon: { type: Date, default: Date.now },
  ngayTra: { type: Date },
});

module.exports = mongoose.model("Borrow", BorrowSchema);
