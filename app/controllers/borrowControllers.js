// controllers/borrowController.js
const Borrow = require("../models/Borrow");
const Reader = require("../models/Reader");
const Book = require("../models/Book");

// Yêu cầu mượn sách
exports.borrowBook = async (req, res) => {
  const { maDocGia, maSach, ngayTraDuKien } = req.body;

  try {
    const reader = await Reader.findOne({ maDocGia });
    if (!reader)
      return res.status(404).json({ error: "Độc giả không tồn tại" });

    const book = await Book.findOne({ maSach });
    if (!book) return res.status(404).json({ error: "Sách không tồn tại" });

    const borrow = new Borrow({
      maDocGia,
      maSach,
      ngayTraDuKien,
      status: "Đang mượn",
    });

    await borrow.save();
    res.status(201).json(borrow);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi mượn sách" });
  }
};

// Xác nhận trả sách
exports.returnBook = async (req, res) => {
  const { borrowId } = req.params;
  const { ngayTraThucTe } = req.body;

  try {
    const borrow = await Borrow.findById(borrowId);
    if (!borrow)
      return res
        .status(404)
        .json({ error: "Không tìm thấy thông tin mượn sách" });

    borrow.ngayTraThucTe = ngayTraThucTe;
    borrow.status = "Đã trả";

    await borrow.save();
    res.status(200).json(borrow);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi trả sách" });
  }
};

// Xem lịch sử mượn sách
exports.getHistory = async (req, res) => {
  const { maDocGia } = req.params;

  try {
    const borrows = await Borrow.find({ maDocGia }).populate("maSach");
    if (borrows.length === 0)
      return res.status(404).json({ error: "Không có lịch sử mượn sách" });

    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi truy vấn lịch sử mượn sách" });
  }
};

// Thống kê sách mượn
exports.getStatistics = async (req, res) => {
  try {
    const totalBorrows = await Borrow.countDocuments();
    const booksNotReturned = await Borrow.countDocuments({
      status: "Đang mượn",
    });
    const overdueBooks = await Borrow.countDocuments({
      status: "Đang mượn",
      ngayTraDuKien: { $lt: new Date() },
    });

    res.status(200).json({ totalBorrows, booksNotReturned, overdueBooks });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thống kê mượn sách" });
  }
};
