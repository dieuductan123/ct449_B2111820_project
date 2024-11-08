const PublisherSchema = new mongoose.Schema({
  maNXB: { type: String, required: true },
  tenNXB: { type: String },
  diaChi: { type: String }
});

module.exports = mongoose.model("Publisher", PublisherSchema);
