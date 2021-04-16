const express = require ('express'); //import express
const app = express(); //executes express
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose =require ('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(
    ('mongodb+srv://BonfaceM:restshop@node-rest-shop.mlqp8.mongodb.net/rest-shop?retryWrites=true&w=majority'),
  
     { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }
  );
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use('/products', productRoutes); //Incoming request must go through app.use
app.use('/orders', orderRoutes);

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X_Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

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