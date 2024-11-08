//routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');

// Thêm sách
router.post('/add', bookController.addBook);

// Cập nhật sách
router.put('/update/:maSach', bookController.updateBook);

// Route để xóa sách
router.delete('/delete/:maSach', bookController.deleteBook);

//Tìm kiếm sách
router.get('/search', bookController.searchBooks);

module.exports = router;