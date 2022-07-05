const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  pulse: {
    type: String,
    required: true,
  },
  spo2: {
    type: String,
    required: true,
  },
  temp: {
    type: String,
    required: true,
  },
});

module.exports = {
  Data: mongoose.model("Data", dataSchema),
};
