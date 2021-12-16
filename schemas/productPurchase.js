const mongoose = require('mongoose');
const productPurchaseSchema = new mongoose.Schema({
    purchaseAmount: {type: Number, required: true},
    purchaseDate: {type: String, default: new Date().toISOString()},
    purchasedItems: [
      {
        productName: {type: String, required: true},
        productRate: {type: Number, required: true},
        productQuantity: {type: Number, required: true},
        refundQuantity: {type: Number, required: true, default: 0},
        refundDate: {type: String},
      },
    ]}, {timestamp: true})

const productPurchase = mongoose.model('productPurchase', productPurchaseSchema)

module.exports = productPurchase;
  