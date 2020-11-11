const express = require('express');

const User = require('../models/users')

const router = express.Router();

//add new user
router.post('/add', (req, res) => {

    //form validation
    User.findByIdAndUpdate({ _id: req.body.id }, { $push: { todos: req.body.todo } }).then(user => {
        return res.status(200).json({
            success: true
        })
    })
})


module.exports = router;
