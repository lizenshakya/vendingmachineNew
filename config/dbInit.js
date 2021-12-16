const product = require('../model/product');
const coin = require('../model/coin');
const productData = require('./staticData/products.json');
const coinData = require('./staticData/coin.json');
const insertInitialData = async () => {
    try {
        const Promises = [
            product.postMany({ data: productData }),
            coin.post({ data: coinData }),
        ];
        await Promise.all(Promises);
    } catch (err) {
        if (err.code === 11000) {
            return;
        }
        console.log(err, 'Error occurred while adding initial data in DB');
    }
};

module.exports = insertInitialData;