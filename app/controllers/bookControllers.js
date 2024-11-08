const Book = require('../models/Book');
// Thêm sách mới
exports.addBook = async(req, res) => {
  try {
    const { maSach, tenSach, donGia, soQuyen, namXuatBan, maNXB, tacGia } =
      req.body;
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
    res.status(201).json({ message: "Book added successfully", data: newBook });
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

// Cập nhật thông tin sách
exports.updateBook = async(req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { maSach: req.params.maSach },
      req.body,
      { new: true }
    );
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book updated successfully", data: updatedBook });
  } catch(error) {
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
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Tìm kiếm sách theo tên, tác giả hoặc thể loại
exports.searchBooks = async (req, res) => {
  try {
     const { tenSach, tacGia, maNXB } = req.query;
     const query = {};

     if (tenSach) query.tenSach = { $regex: tenSach, $options: "i" };
     if (tacGia) query.tacGia = { $regex: tacGia, $options: "i" };
     if (maNXB) query.maNXB = maNXB;

     const books = await Book.find(query);
     res.json({ data: books });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

