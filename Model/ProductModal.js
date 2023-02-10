const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  products: [],
});

const Categories = mongoose.model("Categories", productSchema);

module.exports = { Categories };
