const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  par: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Food", foodSchema);
