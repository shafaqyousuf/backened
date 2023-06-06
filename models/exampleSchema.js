const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  institute: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  registrationDate: {
    type: Date,
    default: Date.now(),
  },
  hobbies: {
    type: [String],
  },
  lastQualification: {
    type: [qualificationSchema],
  },
  address: {
    type: {
      street: String,
      houseNo: String,
    },
  },
});

const userModel = mongoose.model("user", UserSchema);

// module.exports = userModel;
