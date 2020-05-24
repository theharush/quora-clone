"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FilterTagScehma = new Schema({
  tag: {
    type: String,
    default: "General"
  }
});

module.exports = mongoose.model("FilterTags", FilterTagScehma);
