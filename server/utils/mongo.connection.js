//Import the mongoose module
const mongoose = require('mongoose'),
  Promise = require('bluebird'),
  config = require('../config/db');


let connectToMongo = () => {
  //Set up default mongoose connection
  mongoose.connect(config.MONGODB_CONNECTION);
  mongoose.Promise = Promise;
//Get the default connection
  const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  return db;
};


module.exports = connectToMongo;