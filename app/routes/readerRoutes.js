// routes/docgia.js
const express = require("express");
const router = express.Router();
const ReaderController = require("../controllers/ReaderController");

// Đăng ký độc giả mới
router.post("/", ReaderController.signupReader);

// Cập nhật thông tin độc giả
router.put("/:maDocGia", ReaderController.updateReader);

module.exports = router;
