const helper = Model => ({
  find: async (options) => {
    return Model.find(options.query).select(options.select).sort(options.sort);
  },
  findOne: async (options) => {
    return Model.findOne(options.query).select(options.select);
  },
  create: async (options) => {
    return Model.create(options.data);
  },
  insertMany: async (options) => {
    return Model.insertMany(options.data);
  },
  deleteOne: async (options) => {
    return Model.deleteOne(options.query);
  },

  deleteMany: async (options) => {
    return Model.deleteMany(options.query);
  },

  update: async (options) => {
    return Model.updateOne(options.query, options.data);
  },

  // Update multiple items in collection
  updateMany: async (options) => {
    return Model.updateMany(options.query, options.data);

  }
});

module.exports = helper;
