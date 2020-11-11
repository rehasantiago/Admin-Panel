const mongoose = require('mongoose');

const users = require('../connections')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    todos: [{ type: String }]
})

module.exports = User = users.model("users", UserSchema)
