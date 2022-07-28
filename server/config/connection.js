const mongoose = require('mongoose');


// db name: sustainability-eventsdb
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sustainability-eventsdb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
      useCreateIndex: true,
      useFindAndModify: true,
    }
  );
  
  module.exports = mongoose.connection;
  