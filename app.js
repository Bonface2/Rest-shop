const express = require ('express'); //import express
const app = express(); //executes express
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

app.use('/products', productRoutes); //Incoming request must go through app.use
app.use('/orders', orderRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = app;