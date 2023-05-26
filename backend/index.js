
const express = require('express')
const connectToMongo = require('./db');

connectToMongo()
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    
  });



const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})