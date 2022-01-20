const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema for the buyer

const buyer_schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact_number: {
    type: Number,
    required: true,
  },
  batch_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = buyer = mongoose.model("buyers", buyer_schema);