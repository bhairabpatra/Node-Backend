const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let products = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  countInStock: {
    type: String,
    required:true
  }
})

module.exports = mongoose.model('products', products)