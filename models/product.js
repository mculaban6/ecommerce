const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required!"],
  },

  productDescription: {
    type: String,
    required: [true, "Product Description is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Product", productSchema);
