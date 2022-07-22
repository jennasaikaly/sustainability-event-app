const mongoose = require('mongoose');


// TODO: change to correct db name
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/programming-thoughts',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
      useCreateIndex: true,
      useFindAndModify: true,
    }
  );
  
  module.exports = mongoose.connection;
  