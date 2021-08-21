const express = require('express');
const app = express()
bodyParser = require('body-parser');
path = require('path');
mongoose = require('mongoose');
cors = require('cors');
const morgan = require('morgan')
dataBaseConfig = require('./database/db');



// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)




app.use(express.json());
app.use(morgan('tiny'));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(cors());



// Set up express js port
const productRoute = require('./routes/products.route')
// RESTful API root
app.use('/api', productRoute)



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
