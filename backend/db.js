const mongoose = require('mongoose');


const connectToMongo = () => {
  return mongoose.connect('mongodb://localhost:27017/Harry', { useNewUrlParser: true, useUnifiedTopology: true });

};

module.exports = connectToMongo;
