var mongoose = require("mongoose");
var PlaceSchema = new mongoose.Schema({
  betType: String,
  selection: Number,
  stake: Number
});

module.exports = mongoose.model('Place', PlaceSchema);