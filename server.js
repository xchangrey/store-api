var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Models
var Product = require('./models/product');
var Wishlist = require('./models/wishlist');

// Routers
const products = require('./routes/api/product');
const wishlists = require('./routes/api/wishlist');

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))


//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//Use Route to Products
app.use('/products', products);

//Use Route to Wishlist
app.use('/wishlist', wishlists);


//Connect to server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Store API Server running on port ${port}`));



