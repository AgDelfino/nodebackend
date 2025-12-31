const mongoose = require('mongoose');

async function connectMongoDB(url){
    console.log('connected to mongoDb')
    return mongoose.connect(url);
}

module.exports = {
    connectMongoDB,
}