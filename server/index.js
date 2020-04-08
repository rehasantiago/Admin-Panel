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

const db = require('./config/key').mongoTaskURI

mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



const api = require('./routes')
app.use('/api', api)

// const server = http.Server(app);
// const io = socketIO.listen(server);
// io.set('origins', '*:*');
// io.on("connection", socket => {
//     console.log("New client connected" + socket.id);
//     socket.on('initial_data', ()=>{
//         User.find({}).then(users => {
//             io.sockets.emit("get_data", users)
//         })
//     })

//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     });
// })


const server = app.listen(port, function() {
    console.log('running at localhost: ' + port);
});

const io = require('socket.io')(server);
io.origins('*:*')
io.on('connection', socket => {
  console.log("New client connected" + socket.id);

  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });
});
