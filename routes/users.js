const express = require('express');
const User = require('../models/users')
const {registerSchema, loginSchema} = require('../validations/user')
const hash = require('../services/_hash_password')
const checkUser = require('../services/_check_user')
var jwt = require('jsonwebtoken');


const routes = express.Router()
const validator = require('express-joi-validation').createValidator()


routes.post('/login',validator.body(loginSchema),async (req, res) =>{
    const user = await User.findOne({email:req.body.email})
    if(!user)
        return res.status(500).json({status:500, message:"invalid email"})
    const checkPassword = await checkUser(user, req.body.password)
    if(checkPassword===false)
        return res.status(500).json({status:500, message:"invalid password"})
    return res.status(200)
              .json(jwt.sign({_id:user._id, login:user.login},"private"))
})


routes.post('/register',validator.body(registerSchema),async (req, res) =>{
    const u = await hash(req.body.password)
    req.body.password = u
    const user = new User(req.body)
    user.save()
        .then(u=> res.status(200).json(u))
        .catch(err => res.status(500).json(err))
})

module.exports = routes