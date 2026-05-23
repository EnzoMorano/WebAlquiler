const Joi = require('joi');

const reservaSchema = Joi.object({
    date: Joi.date().iso().required().messages({
        'date.format': 'La fecha debe tener formato ISO (YYYY-MM-DD)',
        'any.required': 'La fecha es obligatoria'
    }),
    timeSlot: Joi.string().pattern(/^\d{2}:\d{2}$/).required().messages({
        'string.pattern.base': 'El horario debe tener formato HH:MM',
        'any.required': 'El horario es obligatorio'
    }),
    fieldId: Joi.number().integer().positive().required().messages({
        'number.base': 'El ID de la cancha debe ser un número',
        'any.required': 'El ID de la cancha es obligatorio'
    }),
    clientName: Joi.string().min(3).max(100).required().messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'any.required': 'El nombre del cliente es obligatorio'
    }),
    clientDni: Joi.string().pattern(/^\d{7,9}$/).required().messages({
        'string.pattern.base': 'El DNI debe tener entre 7 y 9 dígitos',
        'any.required': 'El DNI es obligatorio'
    }),
    paymentStatus: Joi.string().valid('pending', 'deposit', 'paid').default('pending'),
    amountPaid: Joi.number().min(0).default(0)
});

const actualizarReservaSchema = Joi.object({
    date: Joi.date().iso().messages({
        'date.format': 'La fecha debe tener formato ISO (YYYY-MM-DD)'
    }),
    timeSlot: Joi.string().pattern(/^\d{2}:\d{2}$/).messages({
        'string.pattern.base': 'El horario debe tener formato HH:MM'
    }),
    fieldId: Joi.number().integer().positive().messages({
        'number.base': 'El ID de la cancha debe ser un número'
    }),
    clientName: Joi.string().min(3).max(100).messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres'
    }),
    clientDni: Joi.string().pattern(/^\d{7,9}$/).messages({
        'string.pattern.base': 'El DNI debe tener entre 7 y 9 dígitos'
    }),
    paymentStatus: Joi.string().valid('pending', 'deposit', 'paid'),
    amountPaid: Joi.number().min(0)
}).min(1).messages({
    'object.min': 'Debe enviar al menos un campo para actualizar'
});

module.exports = { reservaSchema, actualizarReservaSchema };
