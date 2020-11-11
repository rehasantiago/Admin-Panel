const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
//const http = require("http");
//const socketIO = require("socket.io");

require('dotenv').config();

const User = require('./models/users')

const app = express();
const port = process.env.PORT || 8000;

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());// DB Config
app.use(cors());

app.use(function(req,res,next){
console.log(req.body);
next();
})

const db = require('./config/key').mongoUserURI

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const users = require('./routes/users')
app.use('/users', users);

const todos = require('./routes/todos')
app.use('/todos', todos);

app.listen(port, function() {
    console.log('running at localhost: ' + port);
});

