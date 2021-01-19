let mongoose = require("mongoose");
let validator = require("validator");
var uniqueValidator = require("mongoose-unique-validator");

let userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  resion: { type: String, required: true },
  date: {
    type: Date,
    required: true 
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
userSchema.plugin(uniqueValidator);
