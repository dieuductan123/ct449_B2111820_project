// controllers/DocgiaController.js
const reader = require("../models/Reader");

// Thêm độc giả mới
exports.signupReader = async (req, res) => {
  try {
    // Lấy dữ liệu từ request body
    const { maDocGia, hoLot, ten, ngaySinh, phai, diaChi, dienThoai } = req.body;

    // Định dạng lại NgaySinh (nếu có) chỉ lấy ngày, tháng, năm
    const formattedNgaySinh = ngaySinh ? new Date(ngaySinh).toISOString().split("T")[0] : null;

    // Tạo độc giả mới với ngày sinh đã được định dạng
    const docGiaMoi = new reader({
      maDocGia,
      hoLot,
      ten,
      ngaySinh: formattedNgaySinh, // Lưu ngày sinh đã định dạng
      phai,
      diaChi,
      dienThoai,
    });
    await docGiaMoi.save();
    res.status(200).json(docGiaMoi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cập nhật thông tin độc giả
exports.updateReader = async (req, res) => {
  try {
    const docGiaCapNhat = await reader.findOneAndUpdate(
      { maDocGia: req.params.maDocGia }, // tìm độc giả bằng mã
      req.body, // dữ liệu cập nhật
      { new: true } // trả về thông tin mới sau khi cập nhật
    );
    res.json(docGiaCapNhat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa độc giả
exports.deleteReader = async (req, res) => {
  try {
    await reader.findOneAndDelete({ maDocGia: req.params.maDocGia });
    res.json({ message: "Đã xóa độc giả thành công" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Tìm kiếm độc giả
// controllers/DocgiaController.js
exports.findReader = async (req, res) => {
    try {
        const { keyword } = req.query;

        let readers;
        if (keyword && typeof keyword === 'string' && keyword.trim() !== '') {
            // Nếu có keyword, tìm kiếm theo từ khóa
            readers = await reader.find({
                $or: [
                    { hoLot: { $regex: keyword, $options: 'i' } },
                    { ten: { $regex: keyword, $options: 'i' } },
                    { diaChi: { $regex: keyword, $options: 'i' } }
                ]
            });
        } else {
            // Nếu không có keyword, trả về toàn bộ danh sách độc giả
            readers = await reader.find();
        }

        res.json(readers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

