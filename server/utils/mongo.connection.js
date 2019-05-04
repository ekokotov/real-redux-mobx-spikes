//Import the mongoose module
const mongoose = require('mongoose'),
    // Promise = require('bluebird'),
    config = require('../configs/db');


const connectToMongo = () => {
    //Set up default mongoose connection
    mongoose.connect(config.MONGODB_CONNECTION, {useNewUrlParser: true, useCreateIndex: true});

    //Bind connection to error event (to get notification of connection errors)
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return mongoose.connection;
};


module.exports = connectToMongo;
