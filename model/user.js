const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

let User = new Schema({
        name: {
            type: String
            
        },
        email: {
            type: String
             
        },
        passwordHash:{
            type: String,
            default:''
        },
        street:{
            type: String,
            default:''
        },
        apartment:{
            type: String
        },
        city:{
            type: String,
            default:0

        },
        country: {
            type: String,
             
        },
        phone:{
            type: Number,
             

        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        dateCreated:{
            type:Date,
            default:Date.now
        }
})

module.exports = mongoose.model('ecomuser', User)