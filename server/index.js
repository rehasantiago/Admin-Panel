const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");

require('dotenv').config();

const User = require('./models/users')

const app = express();
const port = process.env.PORT || 5000;

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

const db = require('./config/key').mongoTaskURI

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", socket => {
    socket.on('initial_data', ()=>{
        User.find({}).then(users => {
            io.sockets.emit("get_data", users)
        })
    })
})


const api = require('./routes')
app.use('/api', api)

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
