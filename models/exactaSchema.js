var mongoose = require("mongoose");
var exactaSchema = new mongoose.Schema({
  betType: String,
  selectionOne: Number,
  selectionTwo: Number,
  stake: Number
});

module.exports = mongoose.model('ExactaModel', exactaSchema);