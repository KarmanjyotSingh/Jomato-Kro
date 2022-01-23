const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Vendor Schema

const vendor_schema = new Schema({
  manager_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  shop_name: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  open_time: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  close_time: {
    type: String,
    required: true,
  },
});

module.exports = vendor = mongoose.model("vendors", vendor_schema);
