const express = require('express');

const validateRegisterInput = require('../validation/register')
const User = require('../models/users')

const router = express.Router();

//add new user
router.post('/add', (req, res) => {
    //form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' })
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
            });
            newUser.save().then(() => {
                return res.status(200).json({
                    success: true
                })
            }).catch(err => {
                return res.status(400).json(err)
            })
        }
    })
})

router.get('/users', (req, res) => {
    User.find({}).then(users => {
        console.log(users);
        return res.status(200).json({
            users
        })
    })
})

router.post('/update', (req, res) => {
    User.findOneAndUpdate({ _id: req.body.id }, {
        name: req.body.name,
        email: req.body.email,
    }, { new: true }).then((user) => {
        return res.status(200).json({
            success: true,
            user
        })
    })
})

router.post('/delete', async (req, res) => {
    await User.findOneAndDelete({ _id: req.body.id });
    return res.status(200).json({
        success: true
    })
})

module.exports = router;
