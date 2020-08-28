const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv/config');

app.use(bodyParser.json());

//Import routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

app.use('/Posts', postsRoute);
app.use('/Users', usersRoute);


//Routes
app.get('/', (req,res) => {
    res.send('We are on home')
});

app.use(cors());
 
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
   
  app.get('/products/:id', cors(corsOptions), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for only example.com.'})
  })
   
  app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
  })


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },(error) => 
    console.log('Connected to DB', error)
);

