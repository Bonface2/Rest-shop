const express = require ('express');
const router = express.Router();
const mongoose = require ('mongoose');
const order = require('./models/order');
const Order = require('./models/order');

router.get('/', (req, res, next)=> {
    order.find()
    .select('_id product quantity')
    .exec()
    .then(docs => {
        res.status(200).json({
            Total: docs.length,
            Orders: docs.map(doc =>{
                return{
                    id : doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        Type: 'GET',
                        Url: 'http://localhost:3000/orders/'+ doc._id
                    }
                }
            })

        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next)=>{
    const order= new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order.save()
    .then(result =>{
        console.log(result);
        res.status(201).json(result);
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            err: error
        });
    });
});



router.get('/:orderId', (req, res, next)=>{
    res.status(200).json({
        message:"Order details",
        id: req.params.orderId
    })
});

router.delete('/:orderId', (req, res, next)=>{
    res.status(200).json({
        message: 'Order was deleted',
        id: req.params.orderId
    })
})

module.exports= router;