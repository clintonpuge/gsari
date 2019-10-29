const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const config = require('config');

const app = express();

// routes
const user = require('./routes/user');
const topics = require('./routes/topics');
const messages = require('./routes/message');

console.log('a', config.get('db'));
const db = {
  connect: () => mongoose
    .connect(config.get('db'), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('DB Connected'))
    .catch((error) => console.log('ERROR', error)),
  disconnect: async () => {
    await mongoose.disconnect();
  }
};

if (process.env.NODE_ENV !== 'test') {
  db.connect();
}
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/', user);
app.use('/', topics);
app.use('/', messages);

module.exports = {
  app,
  db,
};
