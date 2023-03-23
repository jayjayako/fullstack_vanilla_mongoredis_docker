const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    max: 500,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  lastname: {
    type: String,
    required: true,
    min: 1,
  },
  firstname: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("user1", userSchema);
