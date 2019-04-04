const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/cart')

router.get('/', (req, res, next) => {
  Order.find()
  .select('_id product quantity')
  .exec()
  .then(products =>{
    console.log(products);
    res.status(200).json(products);
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.post('/', (req, res, next) => {
  const product = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.productId,
    quantity: req.body.quantity
  });

  product.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests',
      createdProduct: product
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
});


router.get('/:orderID', (req, res, next) => {
  const idx = req.params.orderID;
  Order.findById(idx)
  .select('_id product quantity')
  .exec()
  .then(doc => {
    console.log(doc);
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: "id errror"})
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error:err})
  })
});

router.put('/:orderID', (req, res, next) => {
  const idx = req.params.orderID;
  Order.update({_id: idx}, {
    $set: {
      quantity: req.body.quantity
    }
  })
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(result);
  });
});

router.delete('/:orderID', (req, res, next) => {
  const idx = req.params.orderID;
  Order.remove({_id: idx})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
});

module.exports = router;
