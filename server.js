const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Models
const Product = require('./models/product');
const Wishlist = require('./models/wishlist');

// Routers
const products = require('./routes/api/product');
const wishlists = require('./routes/api/wishlist');

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

const app = express();

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



