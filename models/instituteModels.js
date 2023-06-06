const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
  },
  telephone: {
    type: String,
    required: true,
  },
});

const InstituteModel = mongoose.model("institute", InstituteSchema);

module.exports = InstituteModel;
