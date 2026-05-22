const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
        'any.required': 'El usuario es obligatorio'
    }),
    password: Joi.string().min(3).required().messages({
        'any.required': 'La contraseña es obligatoria'
    })
});

module.exports = { loginSchema };
