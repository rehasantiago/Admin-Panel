const express = require('express');
const bcrypt = require('bcryptjs');//hashing the pasword before storing it to the database
const jwt = require('jsonwebtoken');

const keys = require('../config/key');
const validateLoginInput = require('../validation/login');
const User = require('../models/users')

const router = express.Router();

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // if(email==="reha@gmail.com" && password==="123456"){
    //     res.status(200).json({
    //         admin: true
    //     })
    // }
    User.findOneAndUpdate({ email }, {$set:{lastActive: Date.now()}}, {new: true}).then(user => {
      if (!user) {
        return res.status(404).json({ email: "Email not found" });
      }
    //   bcrypt.compare(password, user.password).then(isMatch => {
    //     if (isMatch) {
    //       const payload = {
    //         id: user._id
    //       };
    //       jwt.sign(
    //         payload,
    //         keys.secretOrKey,
    //         {
    //           expiresIn: 31556926,
    //           algorithm:'HS384'
    //         },
    //         (err, token) => {
    //           res.json({
    //             success: true,
    //             token: "Bearer " + token
    //           });
    //         }
    //       );
    //     } else {
    //       return res
    //         .status(400)
    //         .json({ password: "Password incorrect" });
    //     }
    //   });
    console.log(user)
    if(user.password===password){
        const payload = {
            id: user._id
        };
        jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926,
              algorithm:'HS384'
            },
            (err, token) => {
              res.status(200).json({
                success: true,
                token: "Bearer " + token,
                user:{
                    name:user.name,
                    email: user.email,
                    disableLogin: user.disableLogin
                }
              });
            }
          );
        }
        else{
            return res.status(400).json({
                password: "Password incorrect"
            })
        }
    });
  });

//add new user



//disable login

module.exports = router;
