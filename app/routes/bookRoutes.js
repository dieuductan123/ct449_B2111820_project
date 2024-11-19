//routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');

router
  .route('/')
  .get(bookController.getAllBooks)     // Lấy danh sách tất sách
  .post(bookController.createBook)       // Thêm sách mới
  .delete(bookController.deleteAllBooks); // Xóa tất cả sách

router
  .route('/:maSach')
  .put(bookController.updateBook)     // Sửa sách theo MaSach
  .delete(bookController.deleteBook); // Xóa sách theo MaSach
  
router.get('/search', bookController.searchBooks); //Tìm kiếm sách theo 

module.exports = router;