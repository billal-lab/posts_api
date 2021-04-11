const Joi = require('joi');


const accessSchema=Joi.object({
    authorization : Joi.required()
})


module.exports.accessSchema = accessSchema
