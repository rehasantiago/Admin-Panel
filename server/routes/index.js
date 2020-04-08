const express = require('express');
const bcrypt = require('bcryptjs');//hashing the pasword before storing it to the database
const jwt = require('jsonwebtoken');

const keys = require('../config/key');
const validateLoginInput = require('../validation/login');
const validateRegisterInput = require('../validation/register')
const User = require('../models/users')
const token = require('../token')

const router = express.Router();

const adminEmail = "admin@gmail.com"
const adminPass = "123456"
router.post("/login", async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    if(email===adminEmail && password===adminPass){
        const payload = {
            email: adminEmail
        };
        const token = await jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926,
              algorithm:'HS384'
            })
        return res.status(200).json({
            success: true,
            token: "Bearer " + token,
            admin: true
        })
    }
    User.findOneAndUpdate({ email }, {$set:{lastActive: Date.now()}}, {new: true}).then(user => {
      if (!user) {
        return res.status(404).json({ email: "Email not found" });
      }
    if(user.password===password){
        return res.status(200).json({
            success: true,
            user:{
                name:user.name,
                email: user.email,
                disableLogin: user.disableLogin
            }
        })
        // const payload = {
        //     id: user._id
        // };
        // jwt.sign(
        //     payload,
        //     keys.secretOrKey,
        //     {
        //       expiresIn: 31556926,
        //       algorithm:'HS384'
        //     },
        //     (err, token) => {
        //       res.status(200).json({
        //         success: true,
        //         token: "Bearer " + token,
        //         user:{
        //             name:user.name,
        //             email: user.email,
        //             disableLogin: user.disableLogin
        //         }
        //       });
        //     }
        //   );
        }
        else{
            return res.status(400).json({
                password: "Password incorrect"
            })
        }
    });
  });

//add new user
router.post('/newUser', token.auth_admin,(req,res) => {
    //form validation
    const { errors,isValid } = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email:req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email:'Email already exists'})
        }
        else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            });
            newUser.save().then(() => {
                return res.status(200).json({
                    success:true
                })
            }).catch(err => {
                return res.status(400).json(err)
            })
        }
    })
})


//disable login
router.post('/disable', token.auth_admin, async(req,res) => {
    await User.findOneAndUpdate({email: req.body.email}, {$set:{disableLogin: req.body.checked}})
})


router.get('/users', token.auth_admin, (req,res) => {
    User.find({}).then(users => {
        return res.status(200).json({
            users
        })
    })
})

module.exports = router;
