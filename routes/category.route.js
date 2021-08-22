const express = require('express');
const app = express();
const categoryRoute = express.Router();

// category model
let Category = require('../model/category');


categoryRoute.route('/get-category').get( async (req, res, next) => {

    const allCategory = await Category.find();
  
    if(!allCategory){
        return res.status(404).json({
            success:false,
            message:"Category not found"
        })
    }
    res.status(200).send(allCategory)
    
})



categoryRoute.route('/get-category/:id').get( async (req, res, next) => {

    const allCategory = await Category.findById(req.params.id);
  
    if(!allCategory){
        return res.status(500).json({
            success:false,
            message:"Category not found"
        })
    }
    res.send(allCategory)
    
})

// Add category
categoryRoute.route('/add-category').post( async (req, res, next) => {

     const category = new Category({
         name:req.body.name,
         icon:req.body.icon,
         color:req.body.color

     })
     categoryList = await category.save()

     if(!categoryList){
         return res.status(404).send('the category cannot be created !')
     }
     res.send(category)
     
})


// Edit  category
categoryRoute.route('/edit-category/:id').put( async (req, res, next) => {

    const updateCategory = await Category.findByIdAndUpdate(
        
            req.params.id,
            {
                name:req.body.name,
                icon:req.body.icon,
                color:req.body.color
            }

    )

    if(!updateCategory){
        return res.status(404).send('the category cannot be created !')
    }
    res.send(updateCategory)
    
})

categoryRoute.route('/:_id').delete( (req,res) => {

    Category.findByIdAndRemove(req.params._id)

    .then(category => {
        if(category){
            return res.status(200).json({
                success:true , 
                message:'the category is deleted'
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
    }).catch((err) =>{
        return res.status(400).json({
            success:flase,
            error:err
        })
    })
})


 
module.exports = categoryRoute;