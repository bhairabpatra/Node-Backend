const express = require('express');
const app = express();
const productRoute = express.Router();
const multer  = require('multer');
const mongoose = require('mongoose')
const authorize = require("../helpers/jwt");
 


// Student model
let Products = require('../model/products');

// Add Student
productRoute.route('/add-products').post((req, res, next) => {

     const product = new Products({

         name:req.body.name,
         description:req.body.description,
         richDescription:req.body.richDescription,
         image:req.body.filename ,
         brand:req.body.brand,
         price:req.body.price,
         countInStock:req.body.countInStock,
         ratting:req.body.ratting,
         numReview:req.body.numReview,
         isFeatured:req.body.isFeatured

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
 

productRoute.route('/edit-prodcuts/:id').put( async (req, res, next) => {

    
    if(mongoose.isValidObjectId(req.params.id)){
            req.status(400).send('invalid Prodcut id')
    }
    const updatProducts = await Category.findByIdAndUpdate(
        
            req.params.id,
            {
                name:req.body.name,
                description:req.body.description,
                richDescription:req.body.richDescription,
                image:req.body.image,
                brand:req.body.brand,
                price:req.body.price,
                countInStock:req.body.countInStock,
                ratting:req.body.ratting,
                numReview:req.body.numReview,
                isFeatured:req.body.isFeatured
            }

    )

    if(!updatProducts){
        return res.status(404).send('The Prodcuts cannot be created !')
    }
    res.send(updateCategory)
    
})



productRoute.route('/all-products').get( authorize, async (req, res) => {
    prodcutsList  = await Products.find()

   .then((products) => {
        res.json(products)
    }).catch( (error) =>{
        return next(error)
    })

    console.log(""+prodcutsList)
    
})


//specific value from the parameter

productRoute.route('/name-products').get( authorize , async (req, res) => {
    prodcutsList  = await Products.find().select('name image _id')

   .then((products) => {
        res.json(products)
    }).catch( (error) =>{
        return next(error)
    })

    console.log(""+prodcutsList)
    
})



productRoute.route('/all-products/:id').get( async (req, res) => {
    prodcutsList  = await Products.findById(req.params.id)

   .then((products) => {
        res.json(products)
    }).catch( (error) =>{
        return next(error)
    })

    console.log(""+prodcutsList)
    
})


productRoute.route('/:id').delete( (req,res) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        req.status(400).send('invalid Prodcut id')
    }
    else{

        Products.findByIdAndRemove(req.params.id)

        .then(products => {
            if(products){
                return res.status(200).json({
                    success:true , 
                    message:'the products is deleted'
                })
            }
            else{
                res.status(404).json({
                    success:false,
                    message:"products not found"
                })
            }
        }).catch((err) =>{
            return res.status(400).json({
                success:flase,
                error:err
            })
        })
    }   
  
})

productRoute.route('/get/count').get(authorize ,async (req,res) =>{

        const productCount = await Products.countDocuments((count) =>{
            count
        })

        if(!productCount){
            res.status(500).json({
                success:false
        })
        }
        res.send({productCount:productCount})
        
})


productRoute.route('/get/featureProduct').get(async (req,res) =>{

    const fProduct = await Products.find({
        
        isFeatured:true
    })

    if(!fProduct){
        res.status(500).json({
            success:false
    })
    }
    res.send(fProduct)
    
})



module.exports = productRoute;