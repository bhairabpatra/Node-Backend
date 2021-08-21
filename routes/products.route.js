const express = require('express');
const app = express();
const productRoute = express.Router();

// Student model
let Products = require('../model/products');

// Add Student
productRoute.route('/add-products').post((req, res, next) => {

//     Products.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
     const product = new Products({
         name:req.body.name,
         image:req.body.image,
         countInStock:req.body.countInStock

     })

     product.save().then((createdProducts => {
         res.status(201).json(createdProducts)
     })).catch((err) => {
         res.status(500).json({
             error:err,
             success:false
         })
     })

});
 

productRoute.route('/all-products').get( async (req, res) => {
    prodcutsList  = await Products.find()
    
   .then((products) => {
        res.json(products)
    }).catch( (error) =>{
        return next(error)
    })

    console.log(""+prodcutsList)
    
    

})

module.exports = productRoute;