const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  icon: String,
  imgs: {
    0: String,
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
    6: String
  },
  price: Number,
  discount: Number,
  discountedPrice: Number,
  stock: Number
});

module.exports = mongoose.model('Product',productSchema)
