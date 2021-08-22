const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

let products = new Schema({
        name: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required:true
        },
        richDescription:{
            type: String,
            default:''
        },
        image:{
            type: String,
            default:''
        },
        images:[{
            name:{
                type: String,   
            }
            }],
        brand:{
            type: String,
        },
        price:{
            type: String,
            default:0

        },
        // category:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Category',
        //     required:true
        // },
        countInStock: {
            type: String,
            required:true,
            min:0,
            max:255
        },
        ratting:{
            type: Number,
            required:true,

        },
        numReview:{
            type:Number,
            default:0
        },
        isFeatured:{
            type:Boolean,
            default:false
        },
        dateCreated:{
            type:Date,
            default:Date.now
        }
})

module.exports = mongoose.model('products', products)