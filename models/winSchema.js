var mongoose = require("mongoose");
var winSchema = new mongoose.Schema({
  betType: String,
  selection: Number,
  stake: Number
});

module.exports = mongoose.model('WinModel', winSchema);

