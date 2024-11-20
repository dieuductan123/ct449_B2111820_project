function auth(req, res, next) {
  if (req.user?.id) return next(); // Nếu có req.user.id, tiếp tục yêu cầu

  return res.sendStatus(401); // Nếu không có user.id trong req.user, trả về lỗi 401
}

module.exports = auth;