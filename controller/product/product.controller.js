const product = require('../../model/product');
const coin = require('../../model/coin');
const productPurchase = require('../../model/productPurchase');
const { sendSuccessResponse } = require('../../utils/response')
const getProducts = async (req, res) => {
  try {
    const dataAvailable = await Promise.all([
      coin.getOne({ query: { vendorId: '01' } }),
      product.get({
        query: {},
        select: {
          id: 1,
          productName: 1,
          productRate: 1,
          productStock: 1,
        },
        sort: { productName: 1 },
      }),
      productPurchase.get({
        query: {},
        select: {
          purchaseDate: 1,
          purchaseAmount: 1,
          purchasedItems: 1,
        },
        sort: { purchaseDate: -1 },
      })
    ])
    return sendSuccessResponse({
      res, data: {
        coins: dataAvailable[0],
        products: dataAvailable[1],
        purchasedItems: dataAvailable[2],
      }
    });
  } catch (err) {
    return next(err);
  }
};

const buyProducts = async (req, res) => {
  try {
    const { coins, products } = req.body;
    const purchaseData = {
      purchaseAmount: products.reduce(
        (acc, cur) => acc + cur.productRate * cur.productQuantity,
        0
      ),
      purchasedItems: products.map(item => {
        return {
          productName: item.productName,
          productRate: item.productRate,
          productQuantity: item.productQuantity,
        }
      }),
    };

    await productPurchase.post({ data: purchaseData });
    await coin.put({ query: { vendorId: '01' }, data: { coinAvailable: coins } });
    for (let i = 0; i < products.length; i++) {
      await product.put({
        query: { productId: products[i].productId },
        data: { productStock: products[i].productStock },
      })
    }
    return sendSuccessResponse({
      res,
      message: `Purchase done - total amount:${coins}`
    });
  } catch (err) {
    return next(err)
  }
};

const refundItems = async (req, res) => {
  try {
    const { coins, refundData, products } = req.body;

    await coin.put({ data: { coinAvailable: coins } });
    for (let refund = 0; refund < refundData.length; refund++) {
      await productPurchase.put({
        query: { 'purchasedItems._id': refundData[refund]._id },
        data: {
          $inc: { 'purchasedItems.$.refundQuantity': refundData[refund].refundQuantity },
          $set: {
            'purchasedItems.$.refundDate': new Date().toISOString(),
          },
        },
      })
    }
    for(let productStockInfo = 0; productStockInfo < products.length; productStockInfo++) {
      await product.put({
          query: { productName: products[productStockInfo].productName },
          data: { $inc: { productStock: products[productStockInfo].productStock } },
        })
    }
    return sendSuccessResponse({
      res,
      message: `Refund successful - total amount:${coins}`
    });
  } catch (err) {
    return next(err)
  }
};
module.exports = {
  getProducts,
  refundItems,
  buyProducts
};
