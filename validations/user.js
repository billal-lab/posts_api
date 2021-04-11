const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    login: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

module.exports.registerSchema = registerSchema
module.exports.loginSchema = loginSchema