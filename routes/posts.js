const express = require('express');
const {accessSchema} = require('../validations/posts')
const jwt = require('jsonwebtoken');
const User = require('../models/users')
const Post = require('../models/posts')
const mongoose = require('mongoose')
const routes = express.Router()
const validator = require('express-joi-validation').createValidator()



routes.use('/', validator.headers(accessSchema),(req, res, next) =>{
    try {
        const verifiedUser = jwt.verify(req.headers.authorization, "private")
        User.findById(verifiedUser._id).then(user =>{
            if(!user){
                return res.status(401).json({message: "Unauthorized"})
            }
            req.headers.user = user
            next()
        })
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
})



routes.get('/',(req, res) =>{
    Post.find()
        .then((posts)=>{
            res.status(200).json(posts)
        })
        .catch((err) =>{
            res.status(500).json({err: err})
        })
})


routes.post('/',(req, res) =>{
    var post = new Post({
        title : req.body.title,
        description : req.body.description,
        user_id : req.headers.user
    })
    post.save()
        .then((post) =>{
            res.status(200).json(post)
        })
        .catch((err) =>{
            res.status(500).json({err: err})
        })
})

routes.get('/:id',(req, res) =>{
    Post.findById(req.params.id)
        .then((posts)=>{
            res.status(200).json(posts)
        })
        .catch((err) =>{
            res.status(500).json({err: err})
        })
})


routes.put('/:id',(req, res) =>{
    Post.updateOne({_id:req.params.id},{title:req.body.title, description:req.body.description})
        .then((posts)=>{
            console.log(posts)
            res.status(200).json(posts)
        })
        .catch((err) =>{
            res.status(500).json({err: err})
        })
})


routes.delete('/:id',(req, res) =>{
    Post.deleteOne({_id:req.params.id})
        .then((posts)=>{
            res.status(200).json(posts)
        })
        .catch((err) =>{
            res.status(500).json({err: err})
        })
})


module.exports = routes