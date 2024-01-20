const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pullSchema = new Schema({
  whoStarted: {
    type: String,
    required: true,
  },
  whoFinished: {
    type: String,
    default: "",
  },
  bohComplete: {
    type: Boolean,
    default: false,
  },
  fohComplete: {
    type: Boolean,
    default: false,
  },
  pullComplete: {
    type: Boolean,
    default: false,
  },
  foods: [{ name: String, boh: Number, foh: Number, howManyPulled: Number }],
});

module.exports = mongoose.model("Pull", pullSchema);
