const express = require('express');
const app = express();
const userRoute = express.Router();
const bcrypt = require('bcryptjs');
// User model
let User = require('../model/user');
const authorize = require("../helpers/jwt");
const jwt = require('jsonwebtoken')

// get User
userRoute.route('/all-user').get( async (req, res, next) => {

    const allUser = await User.find();
  
    if(!allUser){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).send(allUser)    
})


// leave some fild from  User
userRoute.route('/get-user').get( async (req, res, next) => {

    const allUser = await User.find().select(['-passwordHash' , '-_id'])
  
    if(!allUser){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).send(allUser)    
})

// Add User
userRoute.route('/add-user').post((req, res, next) => {
 

    const user = new User({

        name:req.body.name,
        email:req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        street:req.body.street,
        appartment:req.body.appartment,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin

    })

    user.save().then((user => {

        res.status(201).json(user)

    })).catch((err) => {
        res.status(500).json({
            error:err,
            success:false
        })
    })

})


userRoute.route('/login').post( async (req,res,next)=>{

            const user = await User.findOne({
                email:req.body.email
            })

            if(!user){
                return res.status(400).send({
                    success:false,
                    message:"user is not present"
                })
            }
            if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){

                let token =jwt.sign({
                    userId:user.id
                },
                    'secret',
                    { expiresIn:'1d' }
                     
                )
                res.status(200).send({
                 
                    user:user.email,
                    token:token
                })
            }
            else{
                res.status(400).send({
                    message:"password not matched"
                })
            }
            return res.status(200).send(user)
})

module.exports = userRoute;