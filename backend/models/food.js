const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const food_schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  food_type: {
    type: String,
    required: true,
  },
  food_add_on: [
    {
      name: String,
      price: Number,
    },
  ],
  tags: [
    {
      name: String,
    },
  ],
});

module.exports = food_item = mongoose.model("food_item", food_schema);
