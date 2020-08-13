const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },(error) => 
    console.log('Connected to DB', error)
);

app.listen(3000);