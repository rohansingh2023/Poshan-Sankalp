
const mongoose = require('mongoose');
// Connection details
const uri = process.env.MONGO_DB_URI//127.0.0.1:27017/Blood-portal // MongoDB server URI including database name

// Connect to MongoDB using Mongoose
mongoose
  .connect(uri, {   
   useNewUrlParser: true, 
   useUnifiedTopology: true 
  }).then(() => {
    console.log('Connected to MongoDB');

  }).catch((e) => {
    console.error('Error connecting to MongoDB:',e);
  });




