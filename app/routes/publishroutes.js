// routes/nhaxuatban.js
const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/publisherController");

// Thêm nhà xuất bản mới
router.post("/", publisherController.addPublisher);

// Cập nhật thông tin nhà xuất bản
router.put("/:maNXB", publisherController.updatePublisher);

// Xóa nhà xuất bản
router.delete("/:maNXB", publisherController.deletePublisher);

// Tìm kiếm nhà xuất bản
router.get("/", publisherController.findPublisher);

module.exports = router;
