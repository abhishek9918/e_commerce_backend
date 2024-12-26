const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true },

  reg_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
// const userModel = new mongoose.model({});
