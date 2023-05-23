const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
  },
});

const studentModel = mongoose.model("student", StudentSchema);

module.exports = studentModel;
