const product = require('../schemas/product');
const helperFunc = require('./helper');

const query = helperFunc(product)

module.exports = {
  get: query.find,
  getOne: query.findOne,
  post: query.create,
  postMany: query.insertMany,
  delete: query.deleteOne,
  deleteMany: query.deleteMany,
  put: query.update,
};
