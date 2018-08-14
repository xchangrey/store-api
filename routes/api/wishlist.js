const express = require("express");
const router = express.Router();

//Model
const Wishlist = require("../../models/wishlist");

// @route POST /wishlist
// @desc
// @access

router.post('/', function (req, res) {
  var wishlist = new Wishlist();
  wishlist.title = req.body.title;
  wishlist.save(function (err, newWishlist) {
    err ? res.status(500).send({ error: `Could not save wishlist` }) : res.send(newWishlist);
  });
});

// @route PUT /wishlist
// @desc
// @access

router.put('/product/add', function (req, res) {
  Product.findOne({ _id: req.body.productId }, function (err, product) {
    err ? res.status(500).send({ error: `Could not add item to wishlist` }) : Wishlist.update({ _id: req.body.wishlistId }, { $addToSet: { products: product._id } }, function (err, wishlist) {
      err ? res.status(500).send({ error: `Could not add item to wishlist` }) : res.send(`Successfully added the wishlist`);
    });
  });
});

// @route GET /wishlist
// @desc
// @access

router.get('/', function (req, res) {
  Wishlist.find({})
    .populate({ path: 'products', model: 'Product' })
    .exec(function (err, wishlists) {
      err ? res.status(500).send({ error: `Could not fetch wishlist` }) : res.send(wishlists);
    });
});

module.exports = router;
