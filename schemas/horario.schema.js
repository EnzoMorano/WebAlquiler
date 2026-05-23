const Joi = require('joi');

const horarioSchema = Joi.object({
    dayOfWeek: Joi.number().integer().min(0).max(6).required().messages({
        'number.base': 'El dayOfWeek debe ser un número entero',
        'number.min': 'El dayOfWeek debe estar entre 0 y 6',
        'number.max': 'El dayOfWeek debe estar entre 0 y 6',
        'any.required': 'El dayOfWeek es obligatorio'
    }),
    startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required().messages({
        'string.pattern.base': 'El startTime debe tener formato HH:MM',
        'any.required': 'El startTime es obligatorio'
    }),
    endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required().messages({
        'string.pattern.base': 'El endTime debe tener formato HH:MM',
        'any.required': 'El endTime es obligatorio'
    }),
    slotDuration: Joi.number().integer().positive().required().messages({
        'number.base': 'El slotDuration debe ser un número entero',
        'number.positive': 'El slotDuration debe ser positivo',
        'any.required': 'El slotDuration es obligatorio'
    }),
    active: Joi.boolean().optional()
});

const actualizarHorarioSchema = Joi.object({
    dayOfWeek: Joi.number().integer().min(0).max(6).messages({
        'number.base': 'El dayOfWeek debe ser un número entero',
        'number.min': 'El dayOfWeek debe estar entre 0 y 6',
        'number.max': 'El dayOfWeek debe estar entre 0 y 6'
    }),
    startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).messages({
        'string.pattern.base': 'El startTime debe tener formato HH:MM'
    }),
    endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).messages({
        'string.pattern.base': 'El endTime debe tener formato HH:MM'
    }),
    slotDuration: Joi.number().integer().positive().messages({
        'number.base': 'El slotDuration debe ser un número entero',
        'number.positive': 'El slotDuration debe ser positivo'
    }),
    active: Joi.boolean()
}).min(1).messages({ 'object.min': 'Debe enviar al menos un campo para actualizar' });

module.exports = { horarioSchema, actualizarHorarioSchema };
