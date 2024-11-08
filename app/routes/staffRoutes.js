// routes/nhanvien.js
const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

// Thêm nhân viên mới
router.post("/", staffController.addStaff);

// Cập nhật thông tin nhân viên
router.put("/:msnv", staffController.updateStaff);

// Xóa nhân viên
router.delete("/:msnv", staffController.deleteStaff);

// Tìm kiếm nhân viên
router.get("/", staffController.searchStaff);

module.exports = router;
