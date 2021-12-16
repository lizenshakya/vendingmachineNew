const mongoose = require('mongoose');
const coinSchema = new mongoose.Schema({
    vendorId: {type: String, required: true, unique: true},
    coinAvailable: {type: Number, default: 10, required: true},
}, {timestamp: true})

const coin = mongoose.model('coins', coinSchema)

module.exports = coin;
  