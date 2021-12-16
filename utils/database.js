const mongoose = require('mongoose');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};


const connectToMongoDB = async () => {
  try {
    const MONGOURL = (process.env.NODE_ENV==='test') ? process.env.MONGODB_URL_TEST: process.env.MONGODB_URL_DEV;
    const db = await mongoose.connect(MONGOURL, mongoOptions);
    if (db) {
      console.info(`Mongoose connection open to ${JSON.stringify(MONGOURL)}`);
      return db;
    } else {
      console.info(`Mongoose connection could not be open to ${JSON.stringify(MONGOURL)}`);
    }
  } catch (error) {
    console.info(`Mongoose connection could not be open to ${JSON.stringify(MONGOURL)}`);
    return next(error)
  } 
};

module.exports = connectToMongoDB;
