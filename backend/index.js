
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
const port = 5000

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes')) 




app.get('/', (req, res) => {
  res.send('Hello World!')
})

















app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})