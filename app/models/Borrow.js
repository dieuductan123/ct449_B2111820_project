// models/TheoDoiMuonSach.js
const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  maDocGia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reader", 
    required: true,
  },
  maSach: {
    type: String,
    required: true,
  },
  ngayMuon: { type: Date, default: Date.now },
  ngayTraDuKien: { type: Date, required: true },
  ngayTraThucTe: { type: Date },
  status: {
    type: String,
    enum: ["Đang mượn", "Đã trả", "Quá hạn"],
    default: "Đang mượn",
  },
});

module.exports = mongoose.model("Borrow", BorrowSchema);
