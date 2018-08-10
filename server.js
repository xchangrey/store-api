var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/store-api');
var port = 3001;

var Product = require('./model/product');
var Wishlist = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/product', function(req,res){
  var product = new Product();
  product.title = req.body.title;
  product.price = req.body.price;
  product.save(function(err, savedProduct) {
    err ? res.status(500).send({error: `Could not save product`}) : res.send(savedProduct);
  });
});

app.listen(port, () => console.log(`Store API Server running on port ${port}`));



