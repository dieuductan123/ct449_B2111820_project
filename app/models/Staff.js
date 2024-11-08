// models/NhanVien.js
const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  msnv: { type: String, required: true, unique: true },
  hoTenNV: { type: String, required: true },
  password: { type: String, required: true }, // Hash password for security
  chucVu: { type: String },
  diaChi: { type: String },
  soDienThoai: { type: String },
});

module.exports = mongoose.model("Staff", StaffSchema);
