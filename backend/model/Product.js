const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  deliveryTime: String,
  imageUrl: [String],  // Changed to array of strings
  countryOfOrigin: String,
  manufacturer: String,
  packer: String,
  importer: String,
  netQuantity: String,
  mrp: Number,
  dimensions: String,
  weight: String,
  warranty: String,
  returnPolicy: String,
  seller: String,
  category: {
    type : String,
    enum:[
      "Electronics",
      "Fashion & Apparel",
      "Beauty & Personal Care",
      "Home & Kitchen",
      "Toys & Gifts / Hobbies",
      "Food & Beverages"
    ]
  },
  badge: {
    label: {
      type: String,
      enum: ['Bestseller', 'Trending', 'New Arrival']
    },
    color: String
  },
  link: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
