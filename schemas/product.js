const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
    productName: {type: String, required: true, unique: true},
    productRate: {type: Number, required: true},
    productStock: {type: Number, required: true},
    productAdded: {type: String, default: new Date().toISOString()},
}, {timestamp: true})

const product = mongoose.model('products', productSchema)

module.exports = product;
  