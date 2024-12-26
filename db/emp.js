const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  name: String,
  role: String,
  city: String,
});

module.exports = mongoose.model("emps", empSchema);
