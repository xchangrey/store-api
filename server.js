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

app.post('/wishlist', function(req,res){
  var wishlist = new Wishlist();
  wishlist.title = req.body.title;
  wishlist.save(function(err, newWishlist){
    err ? res.status(500).send({error:`Could not save wishlist`}) : res.send(newWishlist);
  });
});

app.put('/wishlist/product/add', function(req,res){
  Product.findOne({_id: req.body.productId}, function(err, product){
    err ? res.status(500).send({error:`Could not add item to wishlist`}) : Wishlist.update({_id:req.body.wishlistId}, {$addToSet:{products:product._id}}, function(err, wishlist){
      err ? res.status(500).send({error:`Could not add item to wishlist`}) : res.send(`Successfully added the wishlist`);
    });
  });
});

app.get('/product', function(req,res){
  Product.find({}, function(err, products){
    err ? res.status(500).send({error:`Could not retrieve products`}) : res.send(products);
  })
});

app.get('/wishlist', function(req,res){
  Wishlist.find({})
  .populate({path:'products', model: 'Product'})
  .exec(function(err,wishlists){
    err ? res.status(500).send({error:`Could not fetch wishlist`}) : res.send(wishlists);
  });
});



app.listen(port, () => console.log(`Store API Server running on port ${port}`));



