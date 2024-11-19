const Book = require("../models/Book");
// Lấy danh sách tất cả sách
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { maSach, tenSach, donGia, soQuyen, namXuatBan, maNXB, tacGia } =
      req.body;

    // Kiểm tra xem mã sách đã tồn tại chưa
    const existingBook = await Book.findOne({ maSach });
    if (existingBook) {
      return res.status(400).json({ error: "Mã sách đã tồn tại." });
    }

    // Tạo sách mới
    const newBook = new Book({
      maSach,
      tenSach,
      donGia,
      soQuyen,
      namXuatBan,
      maNXB,
      tacGia,
    });

    await newBook.save();
    res.status(201).json({ message: "Thêm sách thành công!", data: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin sách theo MaSach
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { maSach: req.params.maSach },
      req.body,
      { new: true }
    );
    if (!updatedBook)
      return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json({
      message: "Cập nhật thông tin sách thành công",
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa sách
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({
      maSach: req.params.maSach,
    });
    if (!deletedBook)
      return res.status(404).json({ message: "Không tìm thấy sách với mã này" });
    res.json({ message: "Xóa sách thành công" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Tìm kiếm sách theo tên, tác giả, thể loại hoặc mã sách
exports.searchBooks = async (req, res) => {
  try {
    const { tenSach, tacGia, maNXB, maSach } = req.query; // Lấy các tham số tìm kiếm từ query
    const query = {};

    // Thêm điều kiện tìm kiếm vào query
    if (tenSach) query.tenSach = { $regex: tenSach, $options: "i" }; // Tìm theo tên sách, không phân biệt chữ hoa/thường
    if (tacGia) query.tacGia = { $regex: tacGia, $options: "i" }; // Tìm theo tác giả
    if (maNXB) query.maNXB = maNXB; // Tìm theo mã nhà xuất bản
    if (maSach) query.maSach = maSach; // Tìm theo mã sách chính xác

    // Thực hiện truy vấn trong CSDL
    const books = await Book.find(query);

    // Trả về kết quả
    res.json({ data: books });
  } catch (error) {
    // Xử lý lỗi
    res.status(400).json({ error: error.message });
  }
};

// Xóa tất cả sách
exports.deleteAllBooks = async (req, res) => {
  try {
    const result = await Book.deleteMany({});
    res
      .status(200)
      .json({
        message: "Đã xóa tất cả sách thành công",
        deletedCount: result.deletedCount,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
