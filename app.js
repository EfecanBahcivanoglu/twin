const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');


//const methodOverride = require ('method-override');
//const ejs = require("ejs");


require('dotenv/config');

app.use(bodyParser.json());
//app.use(methodOverride('_method'))
app.use(cors);
//app.use(ejs);

//Import routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

app.use('/Posts', postsRoute);
app.use('/Users', usersRoute);



//Routes
app.get('/', (req,res) => {
    res.send('We are on home')
});


app.listen(3000);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },(error) => 
    console.log('Connected to DB', error)
);

