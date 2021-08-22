const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

let categorySchema = new Schema({
        name: {
            type: String,
            required:true
        },
        icon:{
            type:String
        },
        color:{
            type:String
        }
})

module.exports = mongoose.model('Category', categorySchema)