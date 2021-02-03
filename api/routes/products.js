const { request } = require('express');
const express = require ('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'Handling GET request to /product'
    });
});

router.post('/',(req, res, next)=>{
    res.status(201).json({
        message:'Handling POST request to /product'
    });
});

router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    if(id==='special'){
        res.status(200).json({
            message: 'You discovered the product with a special ID',
            id: id
        
    });
} else{
    res.status(200).json({
        message:'You passed an ID'
    })
}
});

router.patch('/:productId', (req, res, next)=>{
    res.status(200).json({
        message:'Updated product'
    })
});

router.delete('/:productId', (req, res, next )=>{
    res.status(200).json({
        message:'Successfully deleted the product'
    });
});

module.exports = router;