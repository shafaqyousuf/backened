const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required:true,
  },
  opt1: {
    type: String,
    required: true,
  },
  opt2: {
    type: String,
    required:true
  },
  opt3: {
    type: String,
    required:true,
  },
  opt4: {
    type: String,
    required:true
  },
});

const quizModel = mongoose.model("quiz", QuizSchema);

module.exports = quizModel;
