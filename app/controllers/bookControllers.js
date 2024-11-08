const Book = require('../models/Book');

// Thêm sách mới
exports.addBook = async(req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: 'Sách được thêm thành công', data: newBook });
  } catch(error) {
    res.status(500).json({ message: 'Lỗi khi thêm sách', error: error.message });
  }
};

// Cập nhật thông tin sách
exports.updateBook = async(req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Không tìm thấy sách để cập nhật'});
    }
    res.status(200).json({ message: 'Cập nhật thông tin sách thành công', data: updatedBook });
  } catch(error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật sách', error: error.message }); 
  }
};

// Xóa sách
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.status(200).json({ message: 'Xóa sách thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sách', error: error.message });
  }
};

// Tìm kiếm sách theo tên, tác giả hoặc thể loại
exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  try {
    const books = await Book.find({
      $or: [
        { bookName: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ]
    });
    res.status(200).json({ message: 'Kết quả tìm kiếm', data: books });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sách', error: error.message });
  }
};

