const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyPraser = require('body-parser');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');

//Routes
const product = require('./routes/productroute');
const customer = require('./routes/customerroute');
const shop = require('./routes/shoproute');
const order = require('./routes/orderroute');

const app = express();

app.set("env", process.env.NODE_ENV || "development");

//database connection
require('./db');


app.use(logger('dev'));
app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname,'..', 'dist/bakery-application')));
app.use('/', express.static(path.join(__dirname,'..', 'dist/bakery-application')));

app.use(cors({
  origin: 'http://localhost:4200'
}));

//product
app.use('/api/product/get', product);
app.use('/api/product/add', product);
app.use('/api/product/edit', product);

//customer
app.use('/api/customer/get', customer);
app.use('/api/customer/add', customer);
app.use('/api/customer/edit', customer);

//shop
app.use('/api/shop/get', shop);

//orderList
app.use('/api/order/get', order);
app.use('/api/order/getOrders', order);
app.use('/api/order/add', order);
app.use('/api/order/edit', order);
app.use('/api/order', order);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use('*', (res, req, next) => res.send('this is my default router'));

// error handler
app.use((req, res, err, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = app.get('env').toLowerCase() === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    error: {
      message: error.message
    }
  })

});

module.exports = app;
