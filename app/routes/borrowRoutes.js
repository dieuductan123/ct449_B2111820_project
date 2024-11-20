// routes/borrowRoutes.js
const express = require("express");
const borrowController = require("../controllers/borrowControllers");
const router = express.Router();

// Yêu cầu mượn sách
router.post("/", borrowController.borrowBook);

// Xác nhận trả sách
router.put("/return/:borrowId", borrowController.returnBook);

// Lịch sử mượn sách của độc giả
router.get("/history/:maDocGia", borrowController.getHistory);

// Thống kê mượn sách
router.get("/statistics", borrowController.getStatistics);

module.exports = router;
