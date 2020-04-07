const mongoose = require('mongoose')
const db = require('../config/key').mongoTaskURI
const task = mongoose.createConnection(db, { useNewUrlParser:true,useUnifiedTopology: true })
module.exports = task
