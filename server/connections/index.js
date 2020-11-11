const mongoose = require('mongoose')
const db = require('../config/key').mongoUserURI
const users = mongoose.createConnection(db, { useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false })
module.exports = users
