const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res, next) => {
  Product.find()
  .select('_id name description icon imgs price discount discountedPrice stock inCart')
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
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    icon: req.body.icon,
    imgs: [
      req.body.imgs[0],
      req.body.imgs[1],
      req.body.imgs[2],
      req.body.imgs[3],
      req.body.imgs[4],
      req.body.imgs[5],
      req.body.imgs[6]
    ],
    price: req.body.price,
    discount: req.body.discount,
    discountedPrice: req.body.discountedPrice,
    stock: req.body.stock,
    inCart: req.body.inCart
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

router.get('/:productID', (req, res, next) => {
  const idx = req.params.productID;
  Product.findById(idx)
  .select('_id name description icon imgs price discount discountedPrice stock inCart')
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

router.put('/:productID', (req, res, next) => {
  const idx = req.params.productID;
  Product.update({_id: idx}, {
    $set: {
      name: req.body.name,
      description: req.body.description,
      icon: req.body.icon,
      imgs: [
        req.body.imgs[0],
        req.body.imgs[1],
        req.body.imgs[2],
        req.body.imgs[3],
        req.body.imgs[4],
        req.body.imgs[5],
        req.body.imgs[6]
      ],
      price: req.body.price,
      discount: req.body.discount,
      discountedPrice: req.body.discountedPrice,
      stock: req.body.stock,
      inCart: req.body.inCart
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

router.delete('/:productID', (req, res, next) => {
  const idx = req.params.productID;
  Product.remove({_id: idx})
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
