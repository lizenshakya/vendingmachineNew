const mongoose = require('mongoose');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};


const connectToMongoDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, mongoOptions);
    if (db) {
      console.info(`Mongoose connection open to ${JSON.stringify(process.env.MONGODB_URL)}`);
      return db;
    } else {
      console.info(`Mongoose connection could not be open to ${JSON.stringify(process.env.MONGODB_URL)}`);
    }
  } catch (error) {
    console.info(`Mongoose connection could not be open to ${JSON.stringify(process.env.MONGODB_URL)}`);
    return next(error)
  } 
};

module.exports = connectToMongoDB;
