const mongoose = require("mongoose");

const userResult = new mongoose.Schema({
  userId: "String",
  totalQuestions: "Number",
  attemptedQuestions: "Number",
  unattemptedQuestions: "Number",
  correctAnswers: "Number",
  incorrectAnswers: "Number",
  Set: "String",
  timestamp: "Date",
});

module.exports = mongoose.model("users-results", userResult);
