const express = require('express');
const app = express()
bodyParser = require('body-parser');
path = require('path');
mongoose = require('mongoose');
cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
dataBaseConfig = require('./database/db');
const authJwt = require('./helpers/jwt');
const authorize = require("./helpers/jwt");

// app.use(authJwt);
// app.use((err,req,res,next)  => {
//     if(err){
//         res.status(500).json({
//             message: "erroe in the server"
//         })
//     }
// })
app.use(cors());
app.options('*' , cors())

 
// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)




app.use(express.json());
app.use(morgan('tiny'));


// Set up express js port
const productRoute = require('./routes/products.route')
const categoryRoute = require('./routes/category.route')
const userRoute = require("./routes/user.route");
// RESTful API root
app.use('/api', productRoute)
app.use('/api/category', categoryRoute)
app.use('/api/user', userRoute)



 

 
 
//routing 
app.get('/products' , (req,res) =>{
        const product =[

            {
                id:1,
                name:'bhairab',
                image:'some_url'
            },
            {
                id:2,
                name:'Swpana',
                image:'some_url'
            }
    

        ]
        res.send(product)
})


app.post('/products' , (req,res) =>{
            const newProdcuts = req.body;
            console.log(newProdcuts)
            res.send(newProdcuts)
        })

 
 

 

 

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Connected to port ' + port)
})
