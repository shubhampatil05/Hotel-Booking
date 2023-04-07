const mongoose = require("mongoose");

let clientSchema = new mongoose.Schema({
  Name: String,
  Number: Number,
  Email: String,
  Hotel: String,
  Location: String,
});

let clientModel = mongoose.model("clients-infos", clientSchema);

module.exports = clientModel;
