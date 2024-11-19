// routes/readerRoutes.js
const express = require("express");
const router = express.Router();
const readerController = require("../controllers/readerControllers");

// Đăng ký độc giả mới
router.post("/", readerController.signupReader);

// Cập nhật thông tin độc giả
router.put("/:maDocGia", readerController.updateReader);

// Xóa độc giả
router.delete("/:maDocGia", readerController.deleteReader);

// Tìm kiếm độc giả
router.get("/", readerController.findReader);

module.exports = router;
