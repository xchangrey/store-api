const express = require('express');
const router = express.Router();

//Model
const Product = require('../../models/product');

// @route GET /products
// @desc
// @access

router.get('/', function (req, res) {
  Product.find({}, function (err, products) {
    err ? res.status(500).send({ error: `Could not retrieve products` }) : res.send(products);
  })
});

// @route GET /products
// @desc
// @access

router.post('/', function (req, res) {
  var product = new Product();
  product.title = req.body.title;
  product.price = req.body.price;
  product.save(function (err, savedProduct) {
    err ? res.status(500).send({ error: `Could not save product` }) : res.send(savedProduct);
  });
});

module.exports = router;