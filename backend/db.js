const mongoose = require('mongoose');


const connectToMongo = () => {
  return mongoose.connect('mongodb://localhost:27017/harry', { useNewUrlParser: true, useUnifiedTopology: true });

};

module.exports = connectToMongo;
