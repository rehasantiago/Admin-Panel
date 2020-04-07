const mongoose = require('mongoose');

const task = require('../connections')

const Schema = mongoose.Schema;

const UserSchema =  new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    lastActive:{
        type: Date,
        required: true
    },
    disableLogin :{
        type: Boolean,
        default: false
    }
})

module.exports = User = task.model("users", UserSchema)
