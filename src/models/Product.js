
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  price: { type: Number, required: true },
  attributes: {
    weight: { type: Number, required: true },
    dimensions: { type: String },
  },
});

module.exports = mongoose.model('Product', productSchema);
