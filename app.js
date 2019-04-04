const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const cartRoutes = require('./api/routes/cart');

mongoose.connect('mongodb+srv://Alex:'+ process.env.MONGO_PASS +'@eshop-api-eyrld.mongodb.net/test?retryWrites=true', {
  useNewUrlParser: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT,POST,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use((req, res, next) => {
  const error = new Error('404: Not found. app.js');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
