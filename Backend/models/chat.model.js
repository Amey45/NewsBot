const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    Default: Date.now,
  },
});

module.exports = mongoose.model("Chat", Schema);
