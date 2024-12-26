const mongoose = require("mongoose");

const quesSchema = new mongoose.Schema({
  type: { type: String },
  difficulty: { type: String },
  category: { type: String },
  question: { type: String },
  correct_answer: { type: String },
  incorrect_answers: [{ type: String }],
});

module.exports = mongoose.model("questions-lists", quesSchema);
