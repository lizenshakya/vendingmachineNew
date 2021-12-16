const productPurchase = require('../schemas/productPurchase');
const helperFunc = require('./helper');

const query = helperFunc(productPurchase)

module.exports = {
  get: query.find,
  getOne: query.findOne,
  post: query.create,
  postMany: query.insertMany,
  delete: query.deleteOne,
  deleteMany: query.deleteMany,
  put: query.update,
};
