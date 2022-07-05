const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["doctor", "patient"],
    default: "patient",
    required: true,
  },
});

module.exports = {
  User: mongoose.model("User", UserSchema),
};
