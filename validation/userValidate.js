const Joi = require('joi');

const registerValidation = function(data){
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        age: Joi.number(),
        address: Joi.string(),
        gender :Joi.string(),
        phone : Joi.string().min(10).max(12),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data);
}





const loginValidation = function(data) {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data);
}

module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation