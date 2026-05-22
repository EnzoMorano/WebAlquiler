const Joi = require('joi');

const canchaSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'any.required': 'El nombre es obligatorio'
    }),
    type: Joi.string().min(3).max(50).required().messages({
        'any.required': 'El tipo de cancha es obligatorio'
    }),
    price: Joi.number().positive().precision(2).required().messages({
        'number.positive': 'El precio debe ser un número positivo',
        'any.required': 'El precio es obligatorio'
    })
});

module.exports = { canchaSchema };
