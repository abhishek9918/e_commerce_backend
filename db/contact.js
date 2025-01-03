const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumbers: String,
  addresses: String,
  message: String,
});

module.exports = mongoose.model("users_contact", contactSchema);
