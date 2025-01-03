const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumbers: String,
  addresses: String,
  message: String,

  skillArray: [{ skill: String, experience: String, proficiency: String }],
});

module.exports = mongoose.model("test_data", contactSchema);
