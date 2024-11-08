// routes/muontra.js
const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

// Yêu cầu mượn sách
router.post("/borrow", borrowController.borrowRequest);

// Xác nhận trả sách
router.post("/return", MuonTraController.returnAuthen);

// Xem lịch sử mượn sách
router.get("/history/:maDocGia", borrowController.watchHistory);

module.exports = router;
