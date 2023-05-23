const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
});

const courseModel = mongoose.model("course", CourseSchema);
module.exports = courseModel;
