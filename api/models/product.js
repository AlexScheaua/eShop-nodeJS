const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  icon: String,
  imgs: [
     String,
     String,
     String,
     String,
     String,
     String,
     String
  ],
  price: Number,
  discount: Number,
  discountedPrice: Number,
  stock: Number,
  inCart: Boolean
});

module.exports = mongoose.model('Product',productSchema)
